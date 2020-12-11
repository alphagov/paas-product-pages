import * as React from 'react'
import { GridRow, GridColumn } from '@components/GridLayout'

const CookieBanner = () => (
  <div 
    className="cookie-banner govuk-!-padding-top-3"
    data-module="cookie-banner"
    role="region"
    aria-label="cookie-banner">
    <div className="govuk-width-container">
    <GridRow>
      <GridColumn width='two-thirds'>
        <h2 className="govuk-heading-m">Can we store analytics cookies on your device?</h2>
        <p className="govuk-body">Analytics cookies help us understand how our website is being used.</p>
        <a href="/cookies" className="govuk-button">Set cookie preferences</a>
      </GridColumn>
    </GridRow>
    </div>
  </div>
)

export default CookieBanner
