import React from 'react'
import { Image, Flex } from 'rebass'
import TextRegular from '../TextRegular'

import earthPlant from '../../assets/images/onboarding-first.svg'

export default () => {
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Image src={earthPlant} height={113} width={113} m={20} />
      <TextRegular color={'black'} fontSize={18} textAlign={'center'}>
        It is now clear that by the year 2050 we need to dramatically change the
        way we produce and consume energy across the globe. How should this be
        done?
      </TextRegular>
    </Flex>
  )
}