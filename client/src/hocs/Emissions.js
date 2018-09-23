import React from 'react'
import { connect } from 'redux-bundler-react'
import { Box } from 'rebass/emotion'
import pick from 'lodash/pick'
import values from 'lodash/values'
import keys from 'lodash/keys'

import Graph from '../components/Graph'
import MobileLegend from '../components/MobileLegend'

const Emissions = ({ energyEmissions }) => {
  const usedData = pick(energyEmissions, [
    'Bioenergy credit',
    'LULUCF',
    'Fuel Combustion',
    'Solvent and Other Product Use',
    'Agriculture',
    'Waste'
  ])
  const graphAreas = values(usedData)
  const graphNames = keys(usedData)

  return (
    <Box>
      <Graph
        name={'Greenhouse Gas Emissions'}
        axes={'ktCO2/yr / Date'}
        data={graphAreas}
      />
      <MobileLegend data={graphNames} />
    </Box>
  )
}

export default connect(
  'selectEnergyEmissions',
  Emissions
)
