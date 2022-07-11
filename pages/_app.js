import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'

import Layout from '../components/layout'
import theme from '../theme'

import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no, viewport-fit=cover' />
            </Head>
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    )
}

export default App
