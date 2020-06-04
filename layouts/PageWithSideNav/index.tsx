import React from 'react'
import Head from 'next/head'
import config from '../../config/config.json'


const PageWithSideNav = ({ meta, children }) => (
  <>
  <Head>
    <title>
      {meta && meta.title ? 
        (`${meta.title} - ${config.siteName}`)
        : config.siteName
      }
    </title>
  </Head>
  <div className="govuk-width-container">
    <main className="govuk-main-wrapper" id="main-content" role="main">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <p>navigation goes here</p>
        </div>
        <div className="govuk-grid-column-two-thirds">
          {meta && meta.title ? (
            <h1 className="govuk-heading-xl">{meta.title}</h1>
          ): <></>}
          {children}
        </div>
      </div>
    </main>
  </div>
  </>
)

export default PageWithSideNav
