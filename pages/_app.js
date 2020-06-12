import React, { useEffect } from 'react';
import '../styles/application.scss'

export default function ProductPages({ Component, pageProps }) {
  useEffect(() => {
    document.documentElement.setAttribute('lang','en')
  }, []);
  return <Component {...pageProps} />
}
