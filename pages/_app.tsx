import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function ProductPages ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover' />
        <meta name='theme-color' content='#0b0c0c' />
        <link rel="icon" sizes="48x48" href="/assets/images/favicon.ico" />
        <link rel="icon" sizes="any" href="/assets/images/favicon.svg" type="image/svg+xml" />
        <link rel="mask-icon" href="/assets/images/govuk-icon-mask.svg" color="#0b0c0c" />
        <link rel="apple-touch-icon" href="/assets/images/govuk-icon-180.png" />
        <link rel="manifest" href="/assets/manifest.json" />
        <meta property='og:image' content='/assets/images/govuk-opengraph-image.png' />
        <meta name='description' content='GOV.UK Platform as a Service is being decommissioned' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
