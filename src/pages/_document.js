import Document, { Html, Head, Main, NextScript } from 'next/document'
import Footer from '@components/Footer'
import Header from '@components/Header'

class GovukTemplate extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en' className='govuk-template'>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="theme-color" content="#0b0c0c" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="shortcut icon" sizes="16x16 32x32 48x48" href="/assets/images/favicon.ico" type="image/x-icon" />
          <link rel="mask-icon" href="/assets/images/govuk-mask-icon.svg" color="#0b0c0c" />
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/govuk-apple-touch-icon-180x180.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/assets/images/govuk-apple-touch-icon-167x167.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/govuk-apple-touch-icon-152x152.png" />
          <link rel="apple-touch-icon" href="/assets/images/govuk-apple-touch-icon.png" />
          <meta property="og:image" content="/assets/images/govuk-opengraph-image.png" />
          <meta name="description" content="GOV.UK Platform as a Service - cloud hosting for government services" />
        </Head>
        <body className="govuk-template__body">
          <a href="#main-content" className="govuk-skip-link">Skip to main content</a>
          <Header />
          <Main />
          <Footer />
          <NextScript />
          <script type="text/javascript" src="/assets/javascript/govuk-frontend.js" />
          <script dangerouslySetInnerHTML={{__html: `
            if (typeof window !== 'undefined') { 
              window.GOVUKFrontend.initAll();
            }
           `}} />
        </body>
      </Html>
    )
  }
}

export default GovukTemplate