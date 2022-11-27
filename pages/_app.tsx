import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Auth from 'components/app/Auth';
import Search from 'components/app/Search';
import Header from 'components/app/Header';
import Footer from 'components/app/Footer';
import Following from 'components/app/Following';
import { Provider } from 'react-redux';
import store from 'store';

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  );
}
