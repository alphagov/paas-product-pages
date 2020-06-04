import GenericLayout from '@layouts/GenericLayout'
export default function Custom404() {
  return (
    <GenericLayout>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-l">Page not found</h1>
        <p className="govuk-body">Sorry the page you requested was not found.</p>
        <p className="govuk-body">
          If you typed the web address, check it is correct.
        </p>
        <p className="govuk-body">
          If you pasted the web address, check you copied the entire address.
        </p>
        <p className="govuk-body">Alternatively, try one of these:</p>
        <ul className="govuk-list govuk-list--bullet">
          <li><a href="/">The GOV.UK PaaS home page</a></li>
          <li><a href="/get-started">Getting Started</a></li>
          <li><a href="/features">Features</a></li>
        </ul>
      </div>
    </div>
    </GenericLayout>
  )
}
