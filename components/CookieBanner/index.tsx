import * as React from 'react'

const CookieBanner = () => (
  <div 
    className="cookie-banner" 
    data-module="cookie-banner" 
    role="region" 
    aria-describedby="cookie-banner__heading"
  >
    <div className="cookie-banner__wrapper govuk-width-container">
      <h2 className="govuk-heading-m" id="cookie-banner__heading">Can we store analytics cookies on your device?</h2>
      <p className="govuk-body">Analytics cookies help us understand how our website is being used.</p>
      <div className="cookie-banner__buttons">
        <button className="govuk-button cookie-banner__button cookie-banner__button-accept" type="submit" data-accept-cookies="true" aria-describedby="cookie-banner__heading">
          Yes<span className="govuk-visually-hidden">, GOV.UK PaaS can store analytics cookies on your device</span>
        </button>
        <button className="govuk-button cookie-banner__button cookie-banner__button-reject" type="submit" data-accept-cookies="false" aria-describedby="cookie-banner__heading">
          No<span className="govuk-visually-hidden">, GOV.UK PaaS cannot store analytics cookies on your device</span>
        </button>
        <a className="govuk-link cookie-banner__link" href="/cookies">How GOV.UK PaaS uses cookies</a>
      </div>
    </div>

    <div className="cookie-banner__confirmation govuk-width-container" tabIndex={-1}>
      <p className="cookie-banner__confirmation-message govuk-body">
        You can <a className="govuk-link" href="/cookies">change your cookie settings</a> at any time.
      </p>
      <button className="cookie-banner__hide-button govuk-link" data-hide-cookie-banner="true" role="link">Hide<span className="govuk-visually-hidden"> cookies message</span></button>
    </div>
  </div>
)

export default CookieBanner
