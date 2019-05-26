import React from 'react'
import { connect } from 'redux-bundler-react'
import navHelper from 'internal-nav-helper'
import InfoModal from '../components/InfoModal'
import ShareModal from '../components/ShareModal'
import Onboarding from '../components/Onboarding'
import First from '../components/onboarding/first'
import Second from '../components/onboarding/second'
import Third from '../components/onboarding/third'
import Fourth from '../components/onboarding/fourth'

import FlexWithExtras from '../components/FlexWithExtras'

const Layout = ({
  doUpdateUrl,
  doInfoModalClose,
  route,
  routeInfo,
  isInfoModalOpen,
  isOnboardingOpen,
  onboardingCurrentStep,
  doOnBoardingNextStep,
  doOnBoardingPreviousStep,
  doOnBoardingClose
}) => {
  const Page = route
  // TODO: move this logic to a property of a route itself?
  const isCalculatorPage =
    routeInfo.url !== '/' &&
    routeInfo.url !== '/data' &&
    routeInfo.url !== '/how-it-works'

  return (
    <FlexWithExtras
      css={{ minHeight: isCalculatorPage ? '100%' : 'auto' }}
      width={'100%'}
      bg={isCalculatorPage ? 'background' : 'white'}
      onClick={navHelper(doUpdateUrl)}
    >
      <Onboarding
        isOnboardingOpen={isCalculatorPage ? isOnboardingOpen : false}
        steps={[<First />, <Second />, <Third />, <Fourth />]}
        currentStep={onboardingCurrentStep}
        onNext={doOnBoardingNextStep}
        onBack={doOnBoardingPreviousStep}
        onClose={doOnBoardingClose}
      />

      <ShareModal />
      <Page />
      <InfoModal isInfoModalOpen={isInfoModalOpen} onClose={doInfoModalClose} />
    </FlexWithExtras>
  )
}

export default connect(
  'doUpdateUrl',
  'selectRoute',
  'selectRouteInfo',
  'selectIsInfoModalOpen',
  'selectIsOnboardingOpen',
  'selectOnboardingCurrentStep',
  'doOnBoardingNextStep',
  'doOnBoardingPreviousStep',
  'doOnBoardingClose',
  'doInfoModalClose',
  Layout
)
