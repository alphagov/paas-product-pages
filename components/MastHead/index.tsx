import React from 'react'
import Button from '@components/Button'

const Masthead = () => {

  return (
    <div className="masthead">
      <div className="masthead__content">
        <div className="govuk-grid-row">
          <div className="masthead__body govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl masthead__title ">Host your service in the Cloud< span className="govuk-visually-hidden">with GOV.UK Platform as a service (PaaS)</span></h1>
            <div className="masthead__inline-image">
              <img src="/assets/images/paas-top-image.png" alt="" role="presentation" />
            </div>
            <p className="govuk-!-margin-bottom-5 masthead__description">
              If you work in the public sector, use GOV.UK PaaS to host your service without worrying about infrastructure.
            </p>
            <Button href="/get-started" isStartButton className="masthead__button">See how to get started</Button>
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
