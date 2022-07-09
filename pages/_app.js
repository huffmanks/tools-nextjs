import { ThemeProvider } from '@mui/material/styles'

import Layout from '../components/layout'
import theme from '../theme'

import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    )
}

export default App
