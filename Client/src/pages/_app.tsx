import 'styles/globals.css'

import type { AppProps } from 'next/app'
import store from 'store/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HeadSEO } from 'layout/Components'
import Layout from 'layout'

export default function App({ Component, pageProps }: AppProps) {
    const persistor = persistStore(store)
    const queryClient = new QueryClient()

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <HeadSEO />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    )
}