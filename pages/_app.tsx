import '../styles/globals.css';
import '../styles/prism-tomorrow.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Open AI</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
