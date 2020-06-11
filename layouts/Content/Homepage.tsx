import React from 'react'
import DocumentMeta from '@components/DocumentMeta'
import GenericLayout from '@layouts/GenericLayout'
import Masthead from '@components/MastHead'

export default function HomePage() {
  return ({ children: content }) => {
    return (
      <GenericLayout>
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
      </GenericLayout>
    )
  }
}
