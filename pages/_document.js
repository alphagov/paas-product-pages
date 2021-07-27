import Document, { Head, Html, Main } from 'next/document'
import CookieBanner from '@components/CookieBanner'
import Footer from '@components/Footer'
import Header from '@components/Header'

class GovukTemplate extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang='en' className='govuk-template'>
        <Head />
        <body className='govuk-template__body'>
          <script nonce='**CSP_NONCE_VAL**' dangerouslySetInnerHTML={{ __html: 'document.body.className = ((document.body.className) ? document.body.className + \' js-enabled\' : \'js-enabled\');' }} />
          <a href='#main-content' className='govuk-skip-link'>Skip to main content</a>
          <CookieBanner />
          <Header />
          <Main />
          <Footer />
          <script type='text/javascript' nonce='**CSP_NONCE_VAL**' src='/assets/javascript/application.js' />
        </body>
      </Html>
    )
  }
}

export default GovukTemplate
