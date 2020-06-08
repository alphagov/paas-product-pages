import React from 'react'
import Head from 'next/head'
import config from '../../config/config.json'
import Masthead from '@components/MastHead'

export default function HomePage() {
  return ({ children: content }) => {
    return (
      <>
      <Head>
        <title>{config.siteName}</title>
      </Head>
      <main id="main-content" role="main">
        <div className="app-width-container">
          <Masthead />
        </div>
        <div className="govuk-width-container">
          <div className="govuk-main-wrapper govuk-main-wrapper--l">
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                {content}
              </div>
            </div>
          </div>
        </div>
      </main>
      </>
    )
  }
}
