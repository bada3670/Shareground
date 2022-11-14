import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Auth from 'components/Auth';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Following from 'components/Following';
import { Provider } from 'react-redux';
import store from 'store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Provider store={store}>
        <Auth />
        <Header />
        <Component {...pageProps} />
        <Footer />
        <Following />
      </Provider>
    </div>
  );
}
