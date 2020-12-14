
function Cookies () {
  this.cookieName = 'govuk-paas-cookie-policy'
  this.cookieDomain = 'cloud.service.gov.uk'
  this.cookieDuration = 365
  this.trackingId = 'UA-43115970-5'
}

Cookies.prototype.hasConsentForAnalytics = function () {
  var consentCookie = JSON.parse(this.getCookie(this.cookieName));
  return consentCookie ? consentCookie.analytics : false
}

Cookies.prototype.initAnalytics = function() {

  // guard against being called more than once
  if (!('analytics' in window)) {

    window[`ga-disable-${this.trackingId}`] = false;

    // Load Google Analytics libraries
    this.loadGaAnalytics()
    this.setupGaAnalytics()

    // Track initial pageview
    this.trackGaPageview()
  }
  
}

Cookies.prototype.initCookieBanner = function ($module) {
  this.$module = $module

  this.$module.hideCookieMessage = this.hideCookieMessage.bind(this)
  this.$module.showBannerConfirmationMessage = this.showBannerConfirmationMessage.bind(this)
  this.$module.setBannerCookieConsent = this.setBannerCookieConsent.bind(this)
  this.$module.cookieBannerConfirmationMessage = this.$module.querySelector('.cookie-banner__confirmation')

  if (!this.$module) {
    return
  }

  this.$hideLink = this.$module.querySelector('button[data-hide-cookie-banner]');
  if (this.$hideLink) {
    this.$hideLink.addEventListener('click', this.$module.hideCookieMessage);
  }

  this.$acceptCookiesLink = this.$module.querySelector('button[data-accept-cookies=true]');
  if (this.$acceptCookiesLink) {
    this.$acceptCookiesLink.addEventListener('click', () => this.$module.setBannerCookieConsent(true));
  }

  this.$rejectCookiesLink = this.$module.querySelector('button[data-accept-cookies=false]');
  if (this.$rejectCookiesLink) {
    this.$rejectCookiesLink.addEventListener('click', () => this.$module.setBannerCookieConsent(false));
  }

  this.showCookieBanner()
}

Cookies.prototype.showCookieBanner = function () {
  // Show the cookie banner if not in the cookie settings page and there is no cookie set
  if (!this.isInCookiesPage()) {
    var hasCookiesPolicy = this.getCookie(this.cookieName)
    if (this.$module && !hasCookiesPolicy) {
      this.$module.style.display = 'block'
    }
  }
}

Cookies.prototype.setBannerCookieConsent = function (analyticsConsent) {
  this.setCookie(this.cookieName, JSON.stringify({ 'analytics': analyticsConsent }), {days: this.cookieDuration})

  this.$module.showBannerConfirmationMessage(analyticsConsent)
  this.$module.cookieBannerConfirmationMessage.focus()

  if (analyticsConsent) { 
    this.initAnalytics()
  }
}

Cookies.prototype.hideCookieMessage = function (event) {
  if (this.$module) {
    this.$module.style.display = 'none'
  }

  if (event.target) {
    event.preventDefault()
  }
}

Cookies.prototype.showBannerConfirmationMessage = function (analyticsConsent) {
  var messagePrefix = analyticsConsent ? 'You’ve accepted analytics cookies.' : 'You told us not to use analytics cookies.';

  this.$cookieBannerMainContent = document.querySelector('.cookie-banner__wrapper')
  this.$cookieBannerConfirmationMessage = document.querySelector('.cookie-banner__confirmation-message')

  this.$cookieBannerConfirmationMessage.insertAdjacentText('afterbegin', messagePrefix)
  this.$cookieBannerMainContent.style.display = 'none'
  this.$module.cookieBannerConfirmationMessage.style.display = 'block'
};

Cookies.prototype.isInCookiesPage = function () {
  return window.location.pathname.indexOf('cookies') > -1
}

Cookies.prototype.getCookie = function (name) {
  var nameEQ = name + '='
  var cookies = document.cookie.split(';')
  for (var i = 0, len = cookies.length; i < len; i++) {
    var cookie = cookies[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length)
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length))
    }
  }
  return null
}

Cookies.prototype.setCookie = function (name, values, options) {
  if (typeof options === 'undefined') {
    options = {}
  }

  var cookieString = name + '=' + values
  if (options.days) {
    var date = new Date()
    date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000))
    cookieString = cookieString + '; expires=' + date.toGMTString() + ';domain=' + this.cookieDomain + '; path=/'
  }

  document.cookie = cookieString
}

// cookie setting functions

Cookies.prototype.initCookieSettings = function ($module) {
  this.$module = $module
  this.$module.submitSettingsForm = this.submitSettingsForm.bind(this);

  document.querySelector('form[data-module=cookie-settings]')
    .addEventListener('submit', this.$module.submitSettingsForm)

  this.setInitialFormValues();
}

Cookies.prototype.setInitialFormValues = function () {
  var currentConsentCookie = JSON.parse(this.getCookie(this.cookieName)),
      radioButton

  if (currentConsentCookie && currentConsentCookie.analytics) {
    radioButton = document.querySelector('input[name=cookies-analytics][value=on]')
  } else {
    radioButton = document.querySelector('input[name=cookies-analytics][value=off]')
  }

  radioButton.checked = true;
}

Cookies.prototype.submitSettingsForm = function (event) {
  event.preventDefault()

  var formInputs = event.target.querySelectorAll("input[name=cookies-analytics]"),
      consent = {},
      isGaCookie = !!(this.getCookie('_ga') && this.getCookie('_ga')),
      hasConsented

  for ( var i = 0; i < formInputs.length; i++ ) {
    var input = formInputs[i]
      
    if (input.checked) {
      hasConsented = input.value === "on" ? true : false

      consent.analytics = hasConsented;
      break;
    }
  }

  // if GA cookies exists and user has wuthdrawn consent, then delete them
  if (isGaCookie && !hasConsented) {
    this.setCookie('_ga', '', { days: -1 })
    this.setCookie('_gid', '', { days: -1 })
  }

  this.setCookie(this.cookieName, JSON.stringify(consent), {days: this.cookieDuration})

  this.showConfirmationMessage();

  if(this.hasConsentForAnalytics()) {
    this.initAnalytics()
  }

  return false;
}

Cookies.prototype.showConfirmationMessage = function () {
  var confirmationMessage = document.querySelector('div[data-cookie-confirmation]'),
      previousPageLink = document.querySelector('.previous-page'),
      referrer = Cookies.prototype.getReferrerLink()

  document.body.scrollTop = document.documentElement.scrollTop = 0

  if (referrer && referrer !== document.location.pathname) {
    previousPageLink.href = referrer;
    previousPageLink.style.display = "block"
  } else {
    previousPageLink.style.display = "none"
  }

  confirmationMessage.style.display = "block"
}

Cookies.prototype.getReferrerLink = function () {
  return document.referrer ? new URL(document.referrer).pathname : false
}

// GA analytics functions

Cookies.prototype.setupGaAnalytics = function () {
  window.ga('create', {
    'trackingId': this.trackingId,
    'cookieDomain': 'auto',
    'cookieExpires': this.cookieDuration * 24 * 60 * 60
  });

  window.ga('set', 'anonymizeIp', true)
  window.ga('set', 'allowAdFeatures', false)
  window.ga('set', 'transport', 'beacon')
  window.ga('set', 'title', 'GOV.UK Platform as a Service')
}

Cookies.prototype.loadGaAnalytics = function () {
  (function(i, s, o, g, r, a, m){ i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments) }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
}
// https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
Cookies.prototype.trackGaPageview = function () {

  // strip UUIDs
  var page = (window.location.pathname + window.location.search).replace(
    /[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/g, '…'
  );
  window.ga('send', 'pageview', page)
}

// https://developers.google.com/analytics/devguides/collection/analyticsjs/events
Cookies.prototype.trackGaEvent = function (category, action, options) {

  options = options || {};

  var evt = {
    eventCategory: category,
    eventAction: action
  };

  if (options.label) {
    evt.eventLabel = options.label;
    delete options.label;
  }

  if (typeof options === 'object') {
    $.extend(evt, options);
  }

  window.ga('send', 'event', evt)

}

export default Cookies
