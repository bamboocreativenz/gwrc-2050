require_relative 'model'
require_relative 'model_version'
require 'byebug'
# require 'awesome_print'

class ModelChoice
  attr_accessor :number
  attr_accessor :name
  attr_accessor :type
  attr_accessor :descriptions
  attr_accessor :long_descriptions
  attr_accessor :incremental_or_alternative
  attr_accessor :levels
  attr_accessor :doc
end

class DataFromModel
  attr_accessor :pathway

  # This connects to model.rb which
  # connects to model.c which is a
  # translation of model.xlsx
  def excel
    @excel ||= Model.new
  end

  # Data that changes as the user makes choices
  # The code should be in the form i0g2dd2pp1121f1i032211p004314110433304202304320420121
  # Where each letter or digit corresponds to a choice to be set in the Excel
  def calculate_pathway(code)
    # Need to make sure the Excel is ready for a new calculation
    # before = excel.input_choices.map {| k, v |
    #   {:key => k, :value => v}
    # }
    excel.reset


    # Turn the i0g2dd2pp1121f1i032211p004314110433304202304320420121 into something like
    # [1.8,0.0,1.6,2.0,1.3,1.3,..]
    choices = convert_letters_to_float(code.split(''))
    # Set the spreadsheet controls (input.choices is a named reference in the Excel)
    excel.input_choices = choices

    after = excel.input_choices.map {| k, v |
      k
    }

    # ap after


    puts "EXCEL", excel.output_emissions_percentage_reduction
    descriptions()
    choices()
    types()
    ch = generate_choices()

    # Read out the results, where each of these refers to a named reference in the Excel
    # (e.g. excel.output_imports_quantity refers to the output.imports.quantity named reference)
    {
      # 'sizes' => ch.map { |choice| {:name => choice.name, :size => choice.levels.to_a.size, :number => choice.number }},
      '_id' => code,
      'choices' => choices,
      'ghg' => ghg(excel.output_ghg_by_ipcc_sector),
      # 'output_airquality' => air_quality_format(excel.output_airquality),
      # 'output_diversity' => hash(excel.output_diversity),

      'electricity' => {
      'demand' => hash(excel.output_electricity_demand),
      'supply' => hash(excel.output_electricity_supply),
      'ghg' => hash(excel.output_electricity_ghg),
      'capacity' => hash(excel.output_electricity_capacity)
    },
      
      'output_emissions_percentage_reduction' => excel.output_emissions_percentage_reduction,
      # 'output_finalenergyde' => hash(excel.output_finalenergyde),
      'final_energy_demand' => hash(excel.output_finalenergydemand),
      # 'output_flows' => hash(excel.output_flows),
      # 'output_ghg_by_ipcc_sector' => hash(excel.output_ghg_by_ipcc_sector),
      # 'output_heating_mix' => hash(excel.output_heating_mix),
      # 'output_imports_proportion' => hash(excel.output_imports_proportion),
      # 'output_imports_quantity' => hash(excel.output_imports_quantity),
      'primary_energy_supply' => hash(excel.output_primaryenergysupply),
      # 'output_shannonweinerindex' => hash(excel.output_shannonweinerindex),
      # 'input_choices' => hash(excel.input_choices),
      # 'input_example_pathways' => hash(excel.input_example_pathways),
      # 'input_names' => hash(excel.input_names),
      # 'input_onepagenotes' => hash(excel.input_onepagenotes),
      # 'input_types' => hash(excel.input_types)
    }
  end

  def map_format(table)
    hash = {}
    table[1..-1].each do |row| # Skip the header
      hash[row[0]] = row[-1] # Add the last value
    end
    hash
  end

  def heating_format(table)
    residential = {}
    commercial = {}
    table[1..-1].each do |row| # Skip the header
      name = row[0]
      next if name =~ /Total/i
      residential[name] = row[1]
      commercial[name] = row[2]
    end
    {residential: residential, commercial: commercial}
  end

  def imports_format(proportion_table, quantity_table)
    proportions = hash(proportion_table)
    quantities = hash(quantity_table)
    hash = {}
    proportions.each do |name, proportion|
      quantity = quantities[name]
      hash[name] = {
        "2012" => { quantity: quantity[0].round, proportion: "#{(proportion[0]*100).round}%" },
        "2050" => { quantity: quantity[-1].round, proportion: "#{(proportion[-1]*100).round}%" }
      }
    end
    hash
  end

  def air_quality_format(table)
    {'low' => table[1][1], 'high' => table[0][1]}
  end

  def diversity_format(table)
    hash = {}
    table[1..-1].each do |row| # Skip the header
      hash[row[0]] = { "2012" => "#{(row[1]*100).round}%", "2050" => "#{(row[-1]*100).round}%" }
    end
    hash
  end

  def cost_format(table)
    hash = {}
    table[1..-1].each do |row| # Skip the header
      name = row[0]
      data = {
        low:   row[1],
        point: row[2],
        high:  row[3],
        range: row[4],
        finance_low: row[5],
        finance_point: row[6],
        finance_high: row[7],
        finance_range: row[8]
      }
      hash[name] = data
    end
    hash
  end

  # Data that doesn't change with user choices (more structural)

  def hash(table)
    hash = {}
    table[1..-1].each do |row| # [1..-1] to skip the first row, which is a header
      hash[row[0]] = row[1..-1]
    end
    hash
  end

  # scale ghg to kilotons
  def ghg(table)
    hash = {}
    table[1..-1].each do |row| # [1..-1] to skip the first row, which is a header
      hash[row[0]] = row[1..-1].map{ |v|
        if v.nil?
          v
        else
          v * 1000
        end
      }
    end
    hash
  end

  def choices
    @choices ||= generate_choices
  end

  def generate_choices
    choices = []
    types.each_with_index do |choice_type,i|
      next if choice_type == nil
      next if choice_type == 0.0
      incremental = choice_type =~ /[abcd]/i
      choice = ModelChoice.new
      choice.number = i
      choice.name = names[i]
      choice.type = choice_type
      choice.incremental_or_alternative =  incremental ? 'alternative' : 'incremental'
      choice.descriptions = descriptions[i]
      choice.long_descriptions = long_descriptions[i]
      choice.levels = incremental ? 'A'.upto(choice_type.upcase) : 1.upto(choice_type.to_i)
      choice.doc = one_page_note_filenames[i]
      choices << choice
    end
    choices
  end

  def reported_calculator_version
    excel.output_version
  end

  def types
    @types ||= excel.input_types.flatten
  end

  def choice_sizes
    sizes = {}
    choices.each do |choice|
      sizes[choice.number] = choice.levels.to_a.size
    end
    sizes
  end

  def names
    @names ||= excel.input_names.flatten
  end

  def descriptions
    @descriptions ||= excel.input_descriptions
  end

  def long_descriptions
    @long_descriptions ||= excel.input_long_descriptions
  end

  def example_pathways
    @example_pathways ||= generate_example_pathways
  end

  def one_page_note_filenames
    @one_page_note_filenames ||= excel.input_onepagenotes.flatten
  end

  def generate_example_pathways
    # Transpose the data so that every row is an example pathway
    data = excel.input_example_pathways.transpose
    data = data.map do |pathway_data|
      {
        name: pathway_data[0],
        code: convert_float_to_letters(pathway_data[1..-4]).join,
        description: wrap(pathway_data[-3]),
        wiki: pathway_data[-2],
        cost_comparator: (c = pathway_data[-1]; c.is_a?(Numeric) ? c : nil )
      }
    end
  end

  def cost_comparator_pathways
    example_pathways.find_all do |e|
      e[:cost_comparator]
    end.sort_by do |e|
      e[:cost_comparator]
    end.map do |e|
      e[:code]
    end
  end

  # FIXME: Only wraps one line into two
  def wrap(string, wrap_at_length = 45)
    return "" unless string
    string = string.to_s
    length_so_far = 0
    string.split.partition do |word|
      length_so_far = length_so_far + word.length + 1 # +1 for the trailing space
      length_so_far > wrap_at_length
    end.reverse.map { |a| a.join(" ") }.join("\n")
  end

  # Set the 9 decimal points between 1.1 and 3.9
  FLOAT_TO_LETTER_MAP = Hash["abcdefghijklmnopqrstuvwxyzABCD".split('').map.with_index { |l,i| [(i/10.0)+1,l] }]
  FLOAT_TO_LETTER_MAP[0.0] = '0'
  FLOAT_TO_LETTER_MAP[1.0] = '1'
  FLOAT_TO_LETTER_MAP[2.0] = '2'
  FLOAT_TO_LETTER_MAP[3.0] = '3'
  FLOAT_TO_LETTER_MAP[4.0] = '4'

  LETTER_TO_FLOAT_MAP = FLOAT_TO_LETTER_MAP.invert

  def convert_float_to_letters(array)
    array.map do |entry|
      case entry
      when Float; FLOAT_TO_LETTER_MAP[entry] || entry
      when nil; 0
      else entry
      end
    end
  end

  def convert_letters_to_float(array)
    array.map do |entry|
      LETTER_TO_FLOAT_MAP[entry].to_f || entry.to_f
    end
  end

end

if __FILE__ == $0
  g = DataFromModel.new
  initial_choices = g.excel.input_choices.flatten

  tests = 100
  t = Time.now
  a = []
  c = initial_choices.map { rand(4)+1 }.join
  tests.times do
    a << g.calculate_pathway(c)
  end
  te = Time.now - t
  puts "Problem" if a.any? { |r| r != a.first }
  puts "#{te/tests} seconds per run"
  puts "#{tests/te} runs per second"
end
