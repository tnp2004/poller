import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import "../styles/globals.css"
import Navbar from '@/components/Navbar';
import { Roboto } from '@next/font/google'

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700']
})

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <main className={roboto.className}>
      <Head>
        <title>poller</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}>
        <Navbar />
        <Component {...pageProps} />
      </MantineProvider>
    </main>
  );
}