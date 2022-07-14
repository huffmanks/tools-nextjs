import Head from 'next/head'

const SEO = ({ description, title, url }) => {
    return (
        <Head>
            <title>{`${title} | Stratools`}</title>
            <meta name='title' content={title} />
            <meta name='description' content={description} />

            <meta property='og:type' content='website' />
            <meta property='og:title' content={title} />
            <meta property='og:url' content={`https://tools.huffmanks.com${url}`} />
            <meta property='og:description' content={description} />
            <meta property='og:site_name' content='Stratools' />
            <meta property='og:image' content='/logos/stratools-stacked.png' />

            <meta property='twitter:card' content='summary_large_image' />
            <meta property='twitter:title' content={title} />
            <meta property='twitter:url' content={`https://tools.huffmanks.com${url}`} />
            <meta property='twitter:description' content={description} />
            <meta property='twitter:image' content='/logos/stratools-stacked.png' />
        </Head>
    )
}

export default SEO
