import { createSelector, createAsyncResourceBundle } from 'redux-bundler'
import groupBy from 'lodash/groupBy'
import { oneLineTrim } from 'common-tags'
import leversState from './util/levers'

const bundle = createAsyncResourceBundle({
  name: 'pathways',
  getPromise: async ({ getState, apiFetch, store }) => {
    return apiFetch(`/pathways/${store.selectLeverString()}/data`)
  },
  staleAfter: Infinity
})

const initialState = {
  // needed by createAsyncResourceBundle
  data: null,
  errorTimes: [],
  errorType: null,
  failedPermanently: false,
  isExpired: false,
  isLoading: false,
  isOutdated: false,
  lastSuccess: null,
  // other state
  levers: leversState
}

const baseReducer = bundle.reducer
bundle.reducer = (state = initialState, action) => {
  if (action.type === 'LEVER_UPDATE') {
    const { lever, value } = action.payload
    let levers = { ...state.levers }
    levers[lever].value = value
    return Object.assign({}, state, {
      levers
    })
  }
  return baseReducer(state, action)
}

bundle.selectEmissionsDecrease = state =>
  state.pathways.data
    ? state.pathways.data.output_emissions_percentage_reduction
    : null
// TODO: IK: probably needs to be rolled into a single emissions selector once we figure out what data that should be
bundle.selectEnergyEmissions = state =>
  state.pathways.data ? state.pathways.data.ghg : null
bundle.selectEnergyDemand = state =>
  state.pathways.data ? state.pathways.data.final_energy_demand : null
bundle.selectEnergySupply = state =>
  state.pathways.data ? state.pathways.data.primary_energy_supply : null
bundle.selectElectricityDemand = state =>
  state.pathways.data ? state.pathways.data.electricity.demand : null
bundle.selectElectricitySupply = state =>
  state.pathways.data ? state.pathways.data.electricity.supply : null

bundle.selectLevers = state => state.pathways.levers
bundle.selectLeversByGroup = state =>
  groupBy(state.pathways.levers, lever => lever.group.label)
bundle.selectLeversByTabWithGroup = state =>
  groupBy(state.pathways.levers, lever => lever.group.tab)

bundle.selectLeverString = state => oneLineTrim`
  ${state.pathways.levers.biogasPowerGeneration.value}
  ${state.pathways.levers.solarPanelsForElectricity.value}
  ${state.pathways.levers.solarPanelsForHotWater.value}
  ${state.pathways.levers.nationalGridElectricity.value}
  0
  ${state.pathways.levers.landUseChange.value}
  ${state.pathways.levers.forestType.value}
  2
  ${state.pathways.levers.livestockStockingRates.value}
  ${state.pathways.levers.livestockEmissionsIntensityPracticeChange.value}
  ${state.pathways.levers.livestockEmissionsIntensityNewTech.value}
  0
  ${state.pathways.levers.wasteVolumes.value}
  ${state.pathways.levers.landfillGasCaptureAndEfw.value}
  0
  ${state.pathways.levers.biofuelSupply.value}
  0
  0
  ${state.pathways.levers.travelDemand.value}
  ${state.pathways.levers.modeShare.value}
  ${state.pathways.levers.vehicleOccupancy.value}
  ${state.pathways.levers.electrificationOfLightVehicles.value}
  ${state.pathways.levers.electrificationOfPublicTransport.value}
  ${state.pathways.levers.vehicleFuelEfficiencies.value}
  0
  ${state.pathways.levers.freightVolume.value}
  ${state.pathways.levers.electrificationOfTrucks.value}
  ${state.pathways.levers.freightModeAndEfficiency.value}
  0
  ${state.pathways.levers.demand.value}
  ${state.pathways.levers.efficiency.value}
  ${state.pathways.levers.nationalMarineTransport.value}
  0
  ${state.pathways.levers.homeSpaceAndWaterHeatingDemand.value}
  ${state.pathways.levers.homeHeatingTechnology.value}
  0
  ${state.pathways.levers.homeLightingAndAppliances.value}
  ${state.pathways.levers.electrificationOfHomeCooking.value}
  0
  ${state.pathways.levers.growthInManufacturing.value}
  ${state.pathways.levers.energyEfficiencyAndFuelSwitching.value}
  0
  ${state.pathways.levers.commercialSpaceAndWaterHeatingDemand.value}
  ${state.pathways.levers.commercialHeatingTechnology.value}
  0
  ${state.pathways.levers.commercialLightingAndAppliances.value}
  ${state.pathways.levers.electrificationOfCommercialCooking.value}
  ${state.pathways.levers.solventAndProductUse.value}
`

bundle.doUpdateLever = (lever, value) => ({ dispatch, store }) => {
  dispatch({ type: 'LEVER_UPDATE', payload: { lever, value } })
  store.doMarkPathwaysAsOutdated()
}

bundle.reactInitialPathwaysFetch = createSelector(
  'selectPathwaysShouldUpdate',
  shouldUpdate => {
    if (shouldUpdate) {
      return { actionCreator: 'doFetchPathways' }
    }
  }
)

export default bundle
