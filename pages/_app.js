import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'

import GlobalStateProvider from '../context/GlobalStateProvider'
import Layout from '../components/layout'
import Toast from '../components/common/Toast'

import '../styles/globals.css'
import Script from 'next/script'

const App = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>

            {process.env.NODE_ENV !== 'development' && (
                <Script strategy='afterInteractive' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3e54585eb2634c0196e442b6a16602cf"}' />
            )}

            <ThemeProvider theme={theme}>
                <GlobalStateProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                    <Toast />
                </GlobalStateProvider>
            </ThemeProvider>
        </>
    )
}

export default App
