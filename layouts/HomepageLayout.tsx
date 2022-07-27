import React from 'react'
import Head from 'next/head'
import config from '../config/config.json'

export default function HomePageLayout({ children }) {
  return (
    <>
    <Head>
      <title>{`GOV.UK PaaS is being decommissioned - ${config.siteName}`}</title>
    </Head>
    <main id="main-content" role="main">
      <div className="govuk-width-container">
        <div className="govuk-main-wrapper govuk-main-wrapper--l">
          {children}
        </div>
      </div>
    </main>
    </>
  )
}
