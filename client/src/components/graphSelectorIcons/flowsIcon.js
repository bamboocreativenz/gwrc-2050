import React from 'react'
import { Box } from 'rebass'

export default ({ active }) => {
  return (
    <Box width={20} mr={10}>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          opacity={active ? '1' : '0.2'}
          d='M17.551 6.06194C16.0383 4.64555 14.0752 3.86913 11.9926 3.87097C8.24468 3.87426 5.00903 6.4441 4.11566 10.0089C4.05063 10.2684 3.81944 10.4516 3.5519 10.4516H0.779177C0.416371 10.4516 0.140758 10.1222 0.207871 9.76568C1.25482 4.206 6.13611 0 12 0C15.2152 0 18.135 1.26464 20.2894 3.32347L22.0176 1.59532C22.7491 0.863758 24 1.38189 24 2.4165V8.90323C24 9.5446 23.4801 10.0645 22.8387 10.0645H16.352C15.3174 10.0645 14.7992 8.81366 15.5308 8.08205L17.551 6.06194ZM1.16129 13.9355H7.64802C8.68263 13.9355 9.20076 15.1863 8.46919 15.918L6.44903 17.9381C7.96171 19.3545 9.92492 20.131 12.0075 20.1291C15.7536 20.1257 18.9905 17.5576 19.8843 13.9912C19.9494 13.7317 20.1806 13.5485 20.4481 13.5485H23.2209C23.5837 13.5485 23.8593 13.8779 23.7922 14.2344C22.7452 19.794 17.8639 24 12 24C8.78477 24 5.86495 22.7354 3.71056 20.6765L1.98242 22.4047C1.25085 23.1362 0 22.6181 0 21.5835V15.0968C0 14.4554 0.519919 13.9355 1.16129 13.9355Z'
          fill={active ? '#00FFC2' : 'white'}
        />
      </svg>
    </Box>
  )
}
