import React from 'react'
import Button from '@components/Button'

const Masthead = () => {

  return (
    <div className="masthead">
      <div className="masthead__content">
        <div className="govuk-grid-row">
          <div className="masthead__body govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl masthead__title ">Host your applications in the Cloud< span className="govuk-visually-hidden">with GOV.UK Platform as a Service (PaaS)</span></h1>
            <div className="masthead__inline-image">
              <img src="/assets/images/paas-top-image.png" alt="" role="presentation" />
            </div>
            <p className="govuk-!-margin-bottom-5 masthead__description">
              Use GOV.UK Platform as a Service (PaaS) to host your public sector service so you do not need to worry about infrastructure.
            </p>
            <Button 
              href="/get-started" 
              isStartButton 
              className="masthead__button" 
              data-track-click="true"
              data-track-category="Navigation"
              data-track-action="Button Click"
              data-track-label="Get ready"
              >
                Create a free trial account
              </Button>
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
