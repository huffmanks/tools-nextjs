import Head from 'next/head'

const SEO = ({ description, title, url, imageUrl }) => {
    const baseUrl = 'https://tools.huffmanks.com'
    const pageUrl = `${baseUrl}${url}`
    const image = imageUrl ? `${baseUrl}/previews${imageUrl}` : `${baseUrl}/logos/stratools-stacked.png`

    return (
        <Head>
            <title>{`${title} | Stratools`}</title>
            <meta name='title' property='title' content={title} />
            <meta name='description' property='description' content={description} />
            <meta name='url' property='url' content={pageUrl} />
            <meta name='image' property='image' content={image} />

            <meta itemProp='name' content={title} />
            <meta itemProp='description' content={description} />
            <meta itemProp='url' content={pageUrl} />
            <meta itemProp='image' content={image} />

            <meta name='og:type' property='og:type' content='website' />
            <meta name='og:title' property='og:title' content={title} />
            <meta name='og:url' property='og:url' content={pageUrl} />
            <meta name='og:description' property='og:description' content={description} />
            <meta name='og:site_name' property='og:site_name' content='Stratools' />
            <meta name='og:locale' property='og:locale' content='en_US' />
            <meta name='og:image' property='og:image' content={image} />
            <meta name='og:image:alt' property='og:image:alt' content={description} />
            <meta name='og:image:width' property='og:image:width' content='1200' />
            <meta name='og:image:height' property='og:image:height' content='630' />

            <meta name='twitter:card' property='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='@huffmanks2' />
            <meta name='twitter:creator' content='@huffmanks2' />
            <meta name='twitter:domain' property='twitter:domain' content='tools.huffmanks.com' />
            <meta name='twitter:title' property='twitter:title' content={title} />
            <meta name='twitter:url' property='twitter:url' content={pageUrl} />
            <meta name='twitter:description' property='twitter:description' content={description} />
            <meta name='twitter:image' property='twitter:image' content={image} />
            <meta name='twitter:label1' property='twitter:label1' content='View more' />
            <meta name='twitter:data1' property='twitter:data1' content='https://tools.huffmanks.com' />
        </Head>
    )
}

export default SEO
