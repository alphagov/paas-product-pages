/* eslint-disable no-var, prefer-const */
import {
  Button,
  Header,
  SkipLink
} from 'govuk-frontend'

import Cookies from './cookie-functions'

var cookies = new Cookies()

if (cookies.hasConsentForAnalytics()) {
  cookies.initAnalytics()
}

var $cookieSettings = document.querySelector('[data-module="cookie-settings"]')
if ($cookieSettings) {
  cookies.initCookieSettings($cookieSettings)
}

var $buttons = document.querySelectorAll('[data-module="govuk-button"]')
if ($buttons) {
  for (var i = 0; i < $buttons.length; i++) {
    new Button($buttons[i]).init()
  };
}

// there is ever only one header per page
var $header = document.querySelector('[data-module="govuk-header"]')
if ($header) {
  new Header($header).init()
}

// Find first skip link module to enhance.
var $skipLink = document.querySelector('[data-module="govuk-skip-link"]')
new SkipLink($skipLink).init()
