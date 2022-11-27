import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout Component={Component} pageProps={pageProps}/>
  )
}
