/* eslint-disable no-var, prefer-const, no-new */
import {
  SkipLink
} from 'govuk-frontend'

// Find first skip link module to enhance.
var $skipLink = document.querySelector('[data-module="govuk-skip-link"]')
new SkipLink($skipLink)
