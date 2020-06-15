import { useEffect } from 'react'
import '../styles/application.scss'

export default function ProductPages({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') { 
      document.body.className += ' js-enabled';
    }
  }, []);
  return <Component {...pageProps} />
}