/* eslint-disable no-var, prefer-const */
function Analytics () {
  this.$bodyElement = document.querySelector('body')
  this.is404Page = this.$bodyElement.querySelector('h1') ? this.$bodyElement.querySelector('h1').textContent === 'Page not found' : false
}

Analytics.prototype.init = function () {
  this.$bodyElement.addEventListener('click', this.handleClickEvent.bind(this))

  if (this.is404Page) {
    this.page404Event()
  }
}

Analytics.prototype.handleClickEvent = function (e) {
  var target = e.target
  var isLink = e.target.nodeName === 'A'
  // external link: starts with http(s) or mailto and does not contain a "service.gov" in url
  var externalLinkRegex = /^(?=.*(http|mailto))(?:(?!cloud\.service\.gov\.uk).)*$/g
  var isExternalLink = isLink && externalLinkRegex.test(target.getAttribute('href'))
  // we have data tracking attributes on some elements
  var isManuallyTargetedElement = target.hasAttribute('data-track-click') &&
        target.getAttribute('data-track-click').indexOf('true') > -1

  // therem ight be an edge case where a manually tagretted link could also be an external link
  // and we only wan't to fire one function in such a case
  // hence the logic below
  if (isExternalLink && isManuallyTargetedElement) {
    this.trackTargettedLinkClick(target)
  }

  if (!isExternalLink && isManuallyTargetedElement) {
    this.trackTargettedLinkClick(target)
  }

  if (isExternalLink && !isManuallyTargetedElement) {
    this.trackExternalLinkClick(target)
  }
}

Analytics.prototype.trackTargettedLinkClick = function (element) {
  var eventParams = {}
  var category = element.getAttribute('data-track-category')
  var action = element.getAttribute('data-track-action')
  var label = element.getAttribute('data-track-label')

  if (label) {
    eventParams.event_label = label
  }

  if (category) {
    eventParams.event_category = category
  }

  this.sendEvent(action, eventParams)
}

Analytics.prototype.trackExternalLinkClick = function (element) {
  var eventParams = {}
  var action = element.textContent

  eventParams.event_category = 'External Link Clicked'
  eventParams.event_label = element.getAttribute('href')

  this.sendEvent(action, eventParams)
}

Analytics.prototype.page404Event = function () {
  var eventParams = {}
  var action = '404'
  var prettyRequestedPageName = window.location.pathname.replace(/\//g, '')

  eventParams.event_category = 'Error'
  eventParams.event_label = 'Page ' + prettyRequestedPageName

  this.sendEvent(action, eventParams)
}

Analytics.prototype.sendEvent = function (action, options) {
  window.dataLayer = window.dataLayer || []
  var gtag = function () {
    dataLayer.push(arguments)
  }

  gtag('event', action, options)
}

export default Analytics
