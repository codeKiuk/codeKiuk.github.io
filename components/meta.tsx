import Head from 'next/head'
import { BLOG_OWNER_ID } from '../lib/constants'

const Meta = () => {
    return (
        <Head>
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                // href="/favicon/apple-touch-icon.png"
                href="/favicon/fire.jpeg"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                // href="/favicon/favicon-32x32.png"
                href="/favicon/fire.jpeg"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                // href="/favicon/favicon-16x16.png"
                href="/favicon/fire.jpeg"
            />
            <link
                rel="manifest"
                // href="/favicon/site.webmanifest"
                href="/favicon/fire.jpeg"
            />
            <link
                rel="mask-icon"
                // href="/favicon/safari-pinned-tab.svg"
                href="/favicon/fire.jpeg"
                color="#000000"
            />
            <link
                rel="shortcut icon"
                // href="/favicon/favicon.ico"
                href="/favicon/fire.jpeg"
            />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta
                name="msapplication-config"
                content="/favicon/browserconfig.xml"
            />
            <meta name="theme-color" content="#000" />
            <link
                rel="alternate"
                type="application/rss+xml"
                // href="/feed.xml"
                href="/favicon/fire.jpeg"
            />
            <meta name="description" content={`${BLOG_OWNER_ID}`} />
        </Head>
    )
}

export default Meta
