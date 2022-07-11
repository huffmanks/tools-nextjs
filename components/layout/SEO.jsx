import Head from 'next/head'

const SEO = ({ description, title, url }) => {
    return (
        <Head>
            <title>{`${title} | Web Tools`}</title>
            <meta name='description' content={description} />
            <meta property='og:type' content='website' />
            <meta property='og:title' content={title} />
            <meta property='og:url' content={`https://tools.huffmanks.com${url}`} />
            <meta property='og:description' content={description} />
            <meta property='og:site_name' content='Web Tools' />
            <meta property='og:image' content='/logo-512x512.png' />
        </Head>
    )
}

export default SEO
