import React from 'react'
import Head from 'next/head'
import config from '../config/config.json'
import Masthead from '@components/MastHead'

export default function HomePageLayout({ children }) {
  return (
    <>
    <Head>
      <title>{`Host your service in the Cloud - ${config.siteName}`}</title>
    </Head>
    <div className="app-width-container">
      <div className="govuk-breadcrumbs app-breadcrumbs app-breadcrumbs--inverse">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <a className="govuk-breadcrumbs__link" href="https://www.gov.uk/service-toolkit#gov-uk-services">GOV.UK services</a>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">GOV.UK PaaS</li>
        </ol>
      </div>
    </div>
    <main id="main-content" role="main">
      <div className="app-width-container">
        <Masthead />
      </div>
      <div className="govuk-width-container">
        <div className="govuk-main-wrapper govuk-main-wrapper--l">
          {children}
        </div>
      </div>
    </main>
    </>
  )
}
