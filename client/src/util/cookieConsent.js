export function cookieConsentGiven () {
  if (!localStorage.getItem('GWRC_POSTHOG_COOKIE_CONSENT')) {
    return 'undecided'
  }
  return localStorage.getItem('GWRC_POSTHOG_COOKIE_CONSENT')
}

export function setCookieConsent (consent) {
  localStorage.setItem('GWRC_POSTHOG_COOKIE_CONSENT', consent)
}
