import React from 'react'
import Button from '@components/Button'

const Masthead = () => {

  return (
    <div className="masthead">
      <div className="masthead__content">
        <div className="govuk-grid-row">
          <div className="masthead__body govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl masthead__title ">Host your applications in the Cloud< span className="govuk-visually-hidden">with GOV.UK Platform as a service (PaaS)</span></h1>
            <div className="masthead__inline-image">
              <img src="/assets/images/paas-top-image.png" alt="" role="presentation" />
            </div>
            <p className="govuk-!-margin-bottom-5 masthead__description">
              If you work in the public sector, use GOV.UK Platform as a Service to host your applications without worrying about infrastructure.
            </p>
            <div className="govuk-button-group">
              <Button 
                href="/get-started" 
                isStartButton 
                className="masthead__button" 
                data-track-click="true"
                data-track-category="Navigation"
                data-track-action="Button Click"
                data-track-label="Get ready"
                >
                  Create an account
                </Button>
                <span className="govuk-body-s app-text--inverse govuk-!-padding-right-2">
                  or
                </span>
                <a className="govuk-link govuk-link--inverse" href="/features">find out what GOV.UK PaaS offers</a>
            </div>
          </div>
          <div className="masthead__aside govuk-grid-column-one-third">
            <img src="/assets/images/paas-top-image.png" alt="" role="presentation" />
          </div>
        </div>
      </div>  
    </div>
  )
}
export default Masthead
