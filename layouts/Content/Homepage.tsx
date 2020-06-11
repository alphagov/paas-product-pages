import React from 'react'
import DocumentMeta from '@components/DocumentMeta'
import config from '../../config/config.json'
import Masthead from '@components/MastHead'

export default function HomePage() {
  return ({ children: content }) => {
    return (
      <>
      <DocumentMeta />
      <main id="main-content" role="main">
        <div className="app-width-container">
          <Masthead />
        </div>
        <div className="govuk-width-container">
          <div className="govuk-main-wrapper govuk-main-wrapper--l">
            {content}
          </div>
        </div>
      </main>
      </>
    )
  }
}
