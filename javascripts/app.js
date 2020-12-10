import common from 'govuk-frontend/govuk/common'
import Button from 'govuk-frontend/govuk/components/button/button'
import Header from 'govuk-frontend/govuk/components/header/header'

var nodeListForEach = common.nodeListForEach

var $buttons = document.querySelectorAll('[data-module="govuk-button"]')
nodeListForEach($buttons, function ($button) {
  new Button($button).init()
})

var $headers = document.querySelectorAll('[data-module="govuk-header"]')
nodeListForEach($headers, function ($header) {
  new Header($header).init()
})
