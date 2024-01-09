import 'styles/globals.css'

import type { AppProps } from 'next/app'
import store from 'store/index'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HeadSEO } from 'layout/Components'
import Layout from 'layout'

export default function App({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient()

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <HeadSEO />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </QueryClientProvider>
        </Provider>
    )
}