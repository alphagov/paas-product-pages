import React, { useEffect } from 'react';
import '../styles/application.scss'

export default function ProductPages({ Component, pageProps }) {
  useEffect(() => {
    document.documentElement.className +=('govuk-template')
    document.documentElement.setAttribute('lang','en')
    document.body.className += 'js-enabled govuk-template__body';
  }, []);
  return <Component {...pageProps} />
}
