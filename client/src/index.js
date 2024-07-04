import 'react-app-polyfill/ie11'
import 'url-polyfill'
import './util/sign-polyfill'
import 'string-includes-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'redux-bundler-react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import ReactModal from 'react-modal'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

import getStore from './bundles'
import theme from './theme'

import Layout from './hocs/Layout'
// import registerServiceWorker from './registerServiceWorker'

import interBold from './assets/fonts/Inter-UI-Bold.woff2'
import interBlack from './assets/fonts/Inter-UI-Black.woff2'
import interMedium from './assets/fonts/Inter-UI-Medium.woff2'
import interRegular from './assets/fonts/Inter-UI-Regular.woff2'

import { cookieConsentGiven } from './util/cookieConsent'

// see https://posthog.com/tutorials/nextjs-cookie-banner
posthog.init(process.env.REACT_APP_POSTHOG_KEY, {
  api_host: 'https://eu.i.posthog.com',
  person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  persistence: cookieConsentGiven() === 'yes' ? 'localStorage+cookie' : 'memory'
})

const GlobalStyle = createGlobalStyle`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
  background-color: rgba(0,0,0,0.2);
  border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
  background-color: rgba(255,255,255,0.2);
  border-radius: 4px;
  }

  @font-face {
    font-family: 'Inter-UI-Bold';
    src: local('Inter-UI-Bold'), url(${interBold}) format('woff2');
  }
  @font-face {
    font-family: 'Inter-UI-Black';
    src: local('Inter-UI-Black'), url(${interBlack}) format('woff2');
  }
  @font-face {
    font-family: 'Inter-UI-Medium';
    src: local('Inter-UI-Medium'), url(${interMedium}) format('woff2');
  }
  @font-face {
    font-family: 'Inter-UI-Regular';
    src: local('Inter-UI-Regular'), url(${interRegular}) format('woff2');
  }
  * {
    box-sizing: border-box;
  }
  html,body,#root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
`
ReactModal.setAppElement(document.getElementById('root'))

ReactDOM.render(
  <Provider store={getStore()}>
    <ThemeProvider theme={theme}>
      <PostHogProvider client={posthog}>
        <React.Fragment>
          <GlobalStyle />
          <Layout />
        </React.Fragment>
      </PostHogProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
// registerServiceWorker()
