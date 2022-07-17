import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
    return (
        <Html lang='en'>
            <Head>
                <meta charSet='utf-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />

                <meta name='mobile-web-app-capable' content='yes' />
                <meta name='apple-mobile-web-app-capable' content='yes' />
                <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                <meta name='apple-mobile-web-app-title' content='PWA App' />

                <meta name='theme-color' content='#5b21b6' />
                <meta name='apple-mobile-web-app-status-bar' content='#5b21b6' />

                <link rel='shortcut icon' href='/logos/favicon.ico' />
                <link rel='icon' href='/logos/favicon.ico' />

                <link rel='icon' type='image/png' sizes='1200x630' href='/logos/stratools-stacked.png' />
                <link rel='icon' type='image/png' sizes='192x192' href='/logos/logo-192x192.png' />
                <link rel='icon' type='image/png' sizes='512x512' href='/logos/logo-512x512.png' />
                <link rel='apple-touch-icon' sizes='1200x630' href='/logos/stratools-stacked.png' />
                <link rel='apple-touch-icon' sizes='192x192' href='/logos/logo-192x192.png' />
                <link rel='apple-touch-icon' sizes='512x512' href='/logos/logo-512x512.png' />

                <link rel='manifest' href='/manifest.json' />

                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
                <link href='https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Montserrat:wght@100;300;400;500;700&family=Roboto+Mono&display=swap' rel='stylesheet' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document
