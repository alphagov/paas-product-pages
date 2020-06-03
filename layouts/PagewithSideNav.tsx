import React from 'react'

const PageWithSideNav = ({ children }) => (
  <div className="govuk-grid-row">
    <div className="govuk-grid-column-one-third">
      <p>navigation goes here</p>
    </div>
    <div className="govuk-grid-column-two-thirds">
      {children}
    </div>
  </div>
)

export default PageWithSideNav 