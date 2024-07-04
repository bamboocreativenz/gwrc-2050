import React, { useState } from 'react'
import { connect } from 'redux-bundler-react'
import { Flex, Button, Image } from 'rebass'
import ReactModal from 'react-modal'
import { RxCookie, RxCross1 } from 'react-icons/rx'

import TextRegular from './TextRegular'
import TextMedium from './TextMedium'

import { setCookieConsent } from '../util/cookieConsent'

export default props => {
  const { isOpen, setIsOpen, posthog } = props
  const [showCookieSettings, setShowCookieSettings] = useState(false)

  return (
    <ReactModal
      style={{
        content: {
          top: 'auto',
          bottom: '24px',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '513px',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          padding: '20px'
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0)'
        }
      }}
      isOpen={isOpen}
      onRequestClose={() => {
        // if user closes dialog with close cross, opt them out of cookies
        posthog.set_config({ persistence: 'memory' })
        setCookieConsent('no')
        setIsOpen(false)
      }}
      shouldCloseOnOverlayClick
    >
      <Flex flexDirection={'column'} alignItems={'start'} width={'100%'} p={20}>
        <Button
          flexDirection='row'
          alignItems='center'
          color='black'
          css={{
            position: 'absolute',
            right: '5px',
            top: '10px',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
          onClick={() => {
            // if user closes dialog with close cross, opt them out of cookies
            posthog.opt_out_capturing()
            setCookieConsent('no')
            setIsOpen(false)
          }}
        >
          <RxCross1 size={20} />
        </Button>
        {/* <Image width='181px' height='137px' src={oldComputer} mb={20} ml={30} /> */}
        <Flex pb={12} flexDirection='row' alignItems='center'>
          <RxCookie size={40} />
          <TextMedium
            fontFamily='bold'
            color='black'
            textAlign='center'
            fontSize={22}
            ml={12}
          >
            Cookie settings
          </TextMedium>
        </Flex>
        <TextRegular color={'black'}>
          We use cookies to enhance your use of the site and develop content
          that helps you. We do not use third party cookies and will never sell
          your data to third parties for marketing or advertising purposes.
        </TextRegular>
        {showCookieSettings && (
          <Flex mt={24} flexDirection='column'>
            <Flex
              mb={12}
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
              width='100%'
            >
              <TextMedium fontFamily='bold' fontSize={24} color='black'>
                Analytics cookies
              </TextMedium>
              <input
                type='checkbox'
                onChange={e => {
                  if (e.target.checked) {
                    posthog.set_config({ persistence: 'localStorage+cookie' })
                    setCookieConsent('yes')
                  } else {
                    posthog.set_config({ persistence: 'memory' })
                    setCookieConsent('no')
                  }
                }}
                style={{ width: '20px', height: '20px' }}
              />
            </Flex>
            <TextRegular color='black'>
              We&apos;d like to collect website analytics information using
              Posthog to help us improve the website. We collect this data by
              running Posthog analytics JavaScript on your device, which
              collects data about how you have interacted with our site. The
              data is collected in a way that does not directly identify anyone.
              For more information please see our Cookies page.
            </TextRegular>
          </Flex>
        )}
        <Flex flexDirection='row'>
          <Button
            variant={'landingGray'}
            mt={36}
            mr={15}
            css={{ height: '50px' }}
            onClick={() => setShowCookieSettings(!showCookieSettings)}
          >
            <TextRegular fontFamily={'bold'} fontSize={16} color={'background'}>
              Manage settings
            </TextRegular>
          </Button>
          <Button
            variant={'landingGreen'}
            mt={36}
            css={{ height: '50px' }}
            onClick={() => {
              posthog.set_config({ persistence: 'localStorage+cookie' })
              setCookieConsent('yes')
              setIsOpen(false)
            }}
          >
            <TextRegular fontFamily={'bold'} fontSize={16} color={'white'}>
              Accept all
            </TextRegular>
          </Button>
        </Flex>
      </Flex>
    </ReactModal>
  )
}
