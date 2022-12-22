import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from '../redux/store';
import AppProvider from '../components/app-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //refetchOnWindowFocus : false,
      retry: 2,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
});

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp
