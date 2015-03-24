define(['knockout', 'bindings/range'], function(ko) {
  'use strict';

  ko.bindingHandlers.rangeInt = {
    init: function(element, valueAccessor, allBindings, vm, context) {
      var value = valueAccessor();
      var params = allBindings.get('params');

      var min = params.min;
      var max = params.max;
      var step = params.step;
      var tooltips = params.tooltips;

      element.label = '.value-label';

      element.setAttribute('type', 'range');
      element.setAttribute('min', min);
      element.setAttribute('max', max);
      element.setAttribute('step', step);

      var valueLabel = element.parentNode.previousSibling.querySelector(element.label);
      ko.bindingHandlers.rangeInt.setLabelClass(element, max, valueLabel);

      for(var tip in tooltips){
        element.setAttribute('tip'+tip[0], tooltips[tip]);
      }

      element.addEventListener('change', function(){
        value(parseInt(element.value));
      })

      element.addEventListener('input', function(){

        ko.bindingHandlers.rangeInt.setLabelClass(element, max, valueLabel);

        valueLabel.innerHTML = element.value;
        ko.bindingHandlers.rangeInt.setTooltip(element, element.value);
      })

      if(element.parentNode.previousSibling.querySelector(element.label) == null){
        var valueLabel = document.createElement('span');
        valueLabel.classList.add('value-label');
        element.parentNode.insertBefore(valueLabel, element);

        valueLabel.innerHTML = value();
      } else {
        element.parentNode.previousSibling.querySelector(element.label).innerHTML = '1';
      }

      ko.bindingHandlers.range.init(element);
    },

    update: function(element, valueAccessor, allBindings, vm, context) {
      var value = valueAccessor();
      var data = allBindings.get('data');
      var params = allBindings.get('params');

      var max = params.max;

      element.value = value();

      var valueLabel = element.parentNode.previousSibling.querySelector(element.label);
      valueLabel.innerHTML = element.value;

      ko.bindingHandlers.rangeInt.setLabelClass(element, max, valueLabel);
      ko.bindingHandlers.rangeInt.setTooltip(element, element.value);
      ko.bindingHandlers.range.update(element);
    },

    setLabelClass: function(element, max, valueLabel) {
      // Set label colour
      var klass;
      var elValue = element.value;

      if(elValue == max) {
        klass = 'high';
      } else if (elValue > max / 2) {
        klass = 'med';
      } else {
        klass = "low";
      }

      valueLabel.classList.remove('high', 'med', 'low');
      valueLabel.classList.add(klass);
    },

    setTooltip: function(element, value) {
      var val = Math.round(element.value);

      var text = element.getAttribute("tip"+val);
      var tooltip = element.parentNode.querySelector('.tooltip');
      var tooltipText = element.parentNode.querySelector('.tooltip .text');
      tooltipText.innerHTML = text;

      var classmap = {
        "1":"a",
        "2":"b",
        "3":"c",
        "4":"d"
      }

      tooltip.className = "tooltip "+classmap[val];

      var endValue = 3;
      var endPosition = 233;
      var arrowPosition = Math.round(((element.value - 1) / endValue * endPosition) + 2)
      var tooltipArrow = element.parentNode.querySelector('.tooltip .arrow');
      tooltipArrow.style.left = arrowPosition + "px";
    }
  };

});
