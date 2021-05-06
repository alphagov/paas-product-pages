/* eslint-disable no-var, prefer-const */
import common from 'govuk-frontend/govuk/common'
import Button from 'govuk-frontend/govuk/components/button/button'
import Header from 'govuk-frontend/govuk/components/header/header'
import Cookies from './cookie-functions'
import Analytics from './analytics'

var nodeListForEach = common.nodeListForEach
var cookies = new Cookies()
var analytics = new Analytics()

if (cookies.hasConsentForAnalytics()) {
  cookies.initAnalytics()
  analytics.init()
}

var $cookieBanner = document.querySelector('[data-module="cookie-banner"]')
if ($cookieBanner) {
  cookies.initCookieBanner($cookieBanner)
}

var $cookieSettings = document.querySelector('[data-module="cookie-settings"]')
if ($cookieSettings) {
  cookies.initCookieSettings($cookieSettings)
}

var $buttons = document.querySelectorAll('[data-module="govuk-button"]')
nodeListForEach($buttons, function ($button) {
  new Button($button).init()
})

var $headers = document.querySelectorAll('[data-module="govuk-header"]')
nodeListForEach($headers, function ($header) {
  new Header($header).init()
})
