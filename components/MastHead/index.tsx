import React from 'react'
import Button from '@components/Button'

const Masthead = () => {

  return (
    <div className="masthead">
      <div className="masthead__content">
        <div className="govuk-breadcrumbs masthead__breadcrumbs">
          <ol className="govuk-breadcrumbs__list">
            <li className="govuk-breadcrumbs__list-item">
              <a className="govuk-breadcrumbs__link" href="https://www.gov.uk/service-toolkit#gov-uk-services">GOV.UK services</a>
            </li>
            <li className="govuk-breadcrumbs__list-item" aria-current="page">GOV.UK PaaS</li>
          </ol>
        </div>
        <div className="govuk-grid-row">
          <div className="masthead__body govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl masthead__title ">Host your service in the Cloud</h1>
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
