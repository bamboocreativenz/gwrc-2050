import React from 'react'
import ReactModal from 'react-modal'
import { connect } from 'redux-bundler-react'
import { Flex, Button, Box, Heading, Image } from 'rebass'

import TextRegular from './TextRegular'

import twitterLogo from '../assets/images/twitter.png'
import facebookLogo from '../assets/images/facebook.png'
import linkedinLogo from '../assets/images/linkedin.png'
import emailLogo from '../assets/images/email.png'

const ShareModal = ({
  isShareModalOpen,
  doCloseShareModal,
  doCopyShareLink,
  isShareModalLinkCopying,
  didShareModalLinkCopySuccessfully,
  leverUrlObject
}) => {
  const copyText = isShareModalLinkCopying
    ? 'Copying...'
    : didShareModalLinkCopySuccessfully ? 'Copied!' : 'Copy Link'
  return (
    <ReactModal
      isOpen={isShareModalOpen}
      onRequestClose={doCloseShareModal}
      shouldCloseOnOverlayClick
      style={{
        content: {
          top: '50%',
          left: '0px',
          right: '0px',
          marginLeft: 'auto',
          marginRight: 'auto',
          transform: 'translate(0, -50%)',
          maxWidth: '513px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px'
        }
      }}
    >
      <Flex
        flexDirection={'column'}
        width={'100%'}
        p={20}
        alignItems={'center'}
      >
        <Heading color={'black'} fontSize={20} pt={'5px'} pb={20}>
          Share your Scenario
        </Heading>
        <TextRegular
          color={'black'}
          fontSize={[16, 18]}
          py={'5px'}
          textAlign={'center'}
        >
          Copy this custom link to share your 2050 emissions scenario or use the
          buttons to share directly via email or social media.
        </TextRegular>
        <TextRegular
          color={'black'}
          fontSize={[16, 18]}
          py={'5px'}
          textAlign={'center'}
        >
          What will it take to make your scenario a reality?
        </TextRegular>
        <Flex flexDirection={'row'} width={'100%'} my={20}>
          <Box
            py={2}
            px={2}
            css={{
              maxHeight: '60px',
              alignItems: 'flex-start',
              border: '2px solid #E8E8E8',
              overflowX: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            <TextRegular id={'shared-link'} fontSize={14} color={'black'}>
              {`${window.location.origin}/share?${leverUrlObject}`}
            </TextRegular>
          </Box>
          <Button
            variant={'landingGreen'}
            css={{
              cursor: 'pointer',
              maxHeight: '60px',
              whiteSpace: 'nowrap'
            }}
            onClick={doCopyShareLink}
            p={1}
            fontSize={13}
          >
            <TextRegular fontSize={14}>{copyText}</TextRegular>
          </Button>
        </Flex>
        <Flex flexDirection={'column'}>
          <TextRegular fontSize={14} color={'black'}>
            SOCIAL SHARING
          </TextRegular>
          <Flex flexDirection={'row'} flexWrap={'wrap'}>
            <Flex
              alignItems={'center'}
              width={200}
              p={10}
              mr={10}
              mb={10}
              bg={'#38A1F3'}
              css={{
                borderRadius: '3px',
                cursor: 'pointer',
                ':hover': { opacity: 0.7 }
              }}
            >
              <Image
                src={twitterLogo}
                width={[60, 30]}
                height={[60, 30]}
                mr={15}
              />
              <TextRegular fontSize={14} color={'white'}>
                Share on Twitter
              </TextRegular>
            </Flex>
            <Flex
              alignItems={'center'}
              width={200}
              p={10}
              mr={10}
              mb={10}
              bg={'#4267B2'}
              css={{
                borderRadius: '3px',
                cursor: 'pointer',
                ':hover': { opacity: 0.7 }
              }}
            >
              <Image
                src={facebookLogo}
                width={[52, 26]}
                height={[60, 30]}
                mr={15}
              />
              <TextRegular fontSize={14} color={'white'}>
                Share on Facebook
              </TextRegular>
            </Flex>
            <Flex
              alignItems={'center'}
              width={200}
              p={10}
              mr={10}
              mb={10}
              bg={'#333333'}
              css={{
                borderRadius: '3px',
                cursor: 'pointer',
                ':hover': { opacity: 0.7 }
              }}
            >
              <Image
                src={emailLogo}
                width={[64, 32]}
                height={[64, 32]}
                mr={15}
              />
              <TextRegular fontSize={14} color={'white'}>
                Share via email
              </TextRegular>
            </Flex>
            <Flex
              alignItems={'center'}
              width={200}
              p={10}
              mr={10}
              mb={10}
              bg={'#4B5E6F'}
              css={{
                borderRadius: '3px',
                cursor: 'pointer',
                ':hover': { opacity: 0.7 }
              }}
            >
              <Image
                src={linkedinLogo}
                width={[52, 26]}
                height={[60, 30]}
                mr={15}
              />
              <TextRegular fontSize={14} color={'white'}>
                Share on Linkedin
              </TextRegular>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ReactModal>
  )
}

export default connect(
  'selectIsShareModalOpen',
  'doCloseShareModal',
  'doCopyShareLink',
  'selectIsShareModalLinkCopying',
  'selectDidShareModalLinkCopySuccessfully',
  'selectLeverUrlObject',
  ShareModal
)
