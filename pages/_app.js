import { GlobalContextProvider } from '@/context/global';
import '@/src/styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}

export default MyApp;
