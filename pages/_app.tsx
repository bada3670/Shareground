import { Provider } from 'react-redux';
import store from 'store';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Auth from 'components/app/Auth';
import Search from 'components/app/Search';
import Header from 'components/app/Header';
import Footer from 'components/app/Footer';
import Following from 'components/app/Following';
import 'styles/globals.css';

// fontawesome 관련
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ShareGround</title>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <div>
        <Provider store={store}>
          <Auth />
          <Search />
          <Header />
          <Component {...pageProps} />
          <Footer />
          <Following />
        </Provider>
      </div>
    </>
  );
}
