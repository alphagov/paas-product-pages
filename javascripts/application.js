/* eslint-disable no-var, prefer-const, no-new */
import {
  Button,
  Header,
  SkipLink
} from 'govuk-frontend'

var $buttons = document.querySelectorAll('[data-module="govuk-button"]')
if ($buttons) {
  for (var i = 0; i < $buttons.length; i++) {
    new Button($buttons[i])
  };
}

// there is ever only one header per page
var $header = document.querySelector('[data-module="govuk-header"]')
if ($header) {
  new Header($header)
}

// Find first skip link module to enhance.
var $skipLink = document.querySelector('[data-module="govuk-skip-link"]')
new SkipLink($skipLink)
