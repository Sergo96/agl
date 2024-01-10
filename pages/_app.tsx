import 'styles/globals.css';
import 'antd/dist/antd.css';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../src/store';
import ErrorBoundary from '../src/components/ErrorBoundary';
import i18next from '../i18n';
import { I18nextProvider } from 'react-i18next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const router = useRouter();
  useEffect(() => {
    if (location.pathname === '/') {
      router.push('/auctions');
    }
  }, []);
  return (
    <ReduxProvider store={store}>
      <I18nextProvider i18n={i18next}>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </I18nextProvider>
    </ReduxProvider>
  );
}

export default MyApp;
