
function Cookies () {
  this.cookieName = 'govuk-paas-cookie-policy'
  this.cookieDomain = 'cloud.service.gov.uk'
  this.cookieDuration = 365
  this.trackingId = 'UA-43115970-5'
   // disable tracking by default
  window['ga-disable-' + this.trackingId] = true;
}

Cookies.prototype.hasConsentForAnalytics = function () {
  var consentCookie = JSON.parse(this.getCookie(this.cookieName));
  return consentCookie ? consentCookie.analytics : false
}

Cookies.prototype.initAnalytics = function() {

  // guard against being called more than once
  if (!('GoogleAnalyticsObject' in window)) {

   window['ga-disable-' + this.trackingId] = false;

    // Load GTM
    this.loadGtmScript()
    this.setupGtm()
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
    this.$acceptCookiesLink.addEventListener('click', function() {
      this.$module.setBannerCookieConsent(true);
    }.bind(this));
  }

  this.$rejectCookiesLink = this.$module.querySelector('button[data-accept-cookies=false]');
  if (this.$rejectCookiesLink) {
    this.$rejectCookiesLink.addEventListener('click', function() {
      this.$module.setBannerCookieConsent(false);
    }.bind(this));
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

  if (document.location.protocol === 'https:') {
    cookieString = cookieString + '; Secure';
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
      isGaCookie = !!(this.getCookie('_ga') && this.getCookie('_gid')),
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
    var gtagCookie = '_gat_gtag_' + this.trackingId.replace(/-/g,'_')

    this.setCookie('_ga', '', { days: -1 })
    this.setCookie('_gid', '', { days: -1 })
    this.setCookie(gtagCookie, '', { days: -1 })
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
  return document.referrer ? document.referrer : false
}

// GA analytics functions

Cookies.prototype.setupGtm = function () {
  // Pull dimensions vals from meta ; else all script/origin combinations have to be in the CSP	
  window.dataLayer = window.dataLayer || [];	
  function gtag(){dataLayer.push(arguments);}	
  gtag('js', new Date());	

  var config = {
    cookie_expires: this.cookieDuration * 24 * 60 * 60,
    anonymize_ip: true,
    linker: {
      domains: [
        'cloud.service.gov.uk',
        'admin.cloud.service.gov.uk',
        'admin.london.cloud.service.gov.uk', 
        'docs.cloud.service.gov.uk'
      ]
    }
  };

  gtag('config', this.trackingId, config);
}

Cookies.prototype.loadGtmScript = function () {
  var gtmScriptTag = document.createElement("script");
  gtmScriptTag.type = "text/javascript"
  gtmScriptTag.setAttribute("async", "true")
  gtmScriptTag.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=" + this.trackingId)
  document.documentElement.firstChild.appendChild(gtmScriptTag)
}

export default Cookies
