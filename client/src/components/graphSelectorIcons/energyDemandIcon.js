import React from 'react'
import { Box } from 'rebass'

export default ({ active }) => {
  return (
    <Box width={20} mr={10}>
      <svg
        width='27'
        height='22'
        viewBox='0 0 27 22'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          opacity={active ? '1' : '0.2'}
          d='M26.325 15.125H25.65V10.4801C25.65 9.93437 25.4348 9.41016 25.0552 9.02344L20.8406 4.73086C20.4609 4.34414 19.9463 4.125 19.4105 4.125H17.55V2.0625C17.55 0.923828 16.643 0 15.525 0H2.025C0.907031 0 0 0.923828 0 2.0625V15.8125C0 16.9512 0.907031 17.875 2.025 17.875H2.7C2.7 20.1523 4.51406 22 6.75 22C8.98594 22 10.8 20.1523 10.8 17.875H16.2C16.2 20.1523 18.0141 22 20.25 22C22.4859 22 24.3 20.1523 24.3 17.875H26.325C26.6963 17.875 27 17.5656 27 17.1875V15.8125C27 15.4344 26.6963 15.125 26.325 15.125ZM6.75 19.9375C5.63203 19.9375 4.725 19.0137 4.725 17.875C4.725 16.7363 5.63203 15.8125 6.75 15.8125C7.86797 15.8125 8.775 16.7363 8.775 17.875C8.775 19.0137 7.86797 19.9375 6.75 19.9375ZM20.25 19.9375C19.132 19.9375 18.225 19.0137 18.225 17.875C18.225 16.7363 19.132 15.8125 20.25 15.8125C21.368 15.8125 22.275 16.7363 22.275 17.875C22.275 19.0137 21.368 19.9375 20.25 19.9375ZM23.625 11H17.55V6.1875H19.4105L23.625 10.4801V11Z'
          fill={active ? '#00FFC2' : 'white'}
        />
      </svg>
    </Box>
  )
}
