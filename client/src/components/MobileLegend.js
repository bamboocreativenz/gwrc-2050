import React from 'react'
import { Box, Flex } from 'rebass'

import FlexWithExtras from './FlexWithExtras'
import TextRegular from './TextRegular'

export default ({ data, colors }) => {
  if (!data) {
    return null
  }

  return (
    <FlexWithExtras
      display={['flex', 'none']}
      flexDirection={'row'}
      flexWrap={'wrap'}
    >
      {data.map((d, i) => {
        return (
          <Flex key={i} alignItems={'center'} width={'50%'} pr={20} pb={'5px'}>
            <Box
              width={14}
              css={{ height: '14px', minWidth: '14px' }}
              bg={colors[i % 3]}
              mr={10}
            />
            <TextRegular fontSize={11}>{d}</TextRegular>
          </Flex>
        )
      })}
    </FlexWithExtras>
  )
}
