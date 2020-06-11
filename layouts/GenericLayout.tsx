import React from 'react'
import Footer from '@components/Footer'
import Header from '@components/Header'

export default function GenericLayout({children}) {
  return (
    <>
    <a href="#main-content" className="govuk-skip-link">Skip to main content</a>
    <Header />
    <main id="main-content" role="main">
      {children}
    </main>
    <Footer />
    </>
  )
}