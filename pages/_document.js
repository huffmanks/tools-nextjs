import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
    return (
        <Html lang='en'>
            <Head>
                <meta charset='utf-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta name='theme-color' content='#8a6e4b' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon.ico' />
                <link rel='apple-touch-icon' href='/favicon.ico' />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
                <link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap' rel='stylesheet' />
                <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "d78873af07d641f0bf0d5e18b105fcd0"}'></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document
