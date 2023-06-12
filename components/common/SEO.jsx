import Head from 'next/head'

const SEO = ({ description, title, url, imageUrl }) => {
    const baseUrl = 'https://tools.huffmanks.com'

    return (
        <Head>
            <title>{`${title} | Stratools`}</title>
            <meta name='title' content={title} />
            <meta name='description' content={description} />

            <meta name='og:type' property='og:type' content='website' />
            <meta name='og:title' property='og:title' content={title} />
            <meta name='og:url' property='og:url' content={`${baseUrl}${url}`} />
            <meta name='og:description' property='og:description' content={description} />
            <meta name='og:site_name' property='og:site_name' content='Stratools' />
            <meta name='og:image' property='og:image' content={imageUrl ? `${baseUrl}/previews${imageUrl}` : `${baseUrl}/logos/stratools-stacked.png`} />

            <meta name='twitter:card' property='twitter:card' content='summary_large_image' />
            <meta name='twitter:domain' property='twitter:domain' content='tools.huffmanks.com' />
            <meta name='twitter:title' property='twitter:title' content={title} />
            <meta name='twitter:url' property='twitter:url' content={`${baseUrl}${url}`} />
            <meta name='twitter:description' property='twitter:description' content={description} />
            <meta name='twitter:image' property='twitter:image' content={imageUrl ? `${baseUrl}/previews${imageUrl}` : `${baseUrl}/logos/stratools-stacked.png`} />
        </Head>
    )
}

export default SEO
