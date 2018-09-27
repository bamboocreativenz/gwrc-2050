import React from 'react'
import { connect } from 'redux-bundler-react'
import { Flex, Button } from 'rebass'
import navHelper from 'internal-nav-helper'

import FlexWithExtras from '../components/FlexWithExtras'
import GraphSelector from '../components/GraphSelector'

const Layout = ({ doUpdateUrl, route, routeInfo }) => {
  const Page = route

  return (
    <FlexWithExtras
      height={'100%'}
      bg={'background'}
      onClick={navHelper(doUpdateUrl)}
    >
      <Page />
    </FlexWithExtras>
  )
}

export default connect('doUpdateUrl', 'selectRoute', 'selectRouteInfo', Layout)
