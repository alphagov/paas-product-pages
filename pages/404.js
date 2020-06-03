export default function Custom404() {
  return (
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-l">Page not found</h1>
        <p class="govuk-body">Sorry the page you requested was not found.</p>
        <p class="govuk-body">
          If you typed the web address, check it is correct.
        </p>
        <p class="govuk-body">
          If you pasted the web address, check you copied the entire address.
        </p>
        <p class="govuk-body">Alternatively, try one of these:</p>
        <ul class="govuk-list govuk-list--bullet">
          <li><a href="/">The GOV.UK PaaS home page</a></li>
          <li><a href="/get-started">Getting Started</a></li>
          <li><a href="/features">Features</a></li>
        </ul>
      </div>
    </div>
  )
}