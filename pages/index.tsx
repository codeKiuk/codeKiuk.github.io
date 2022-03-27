import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { BLOG_OWNER, BLOG_OWNER_ID } from '../lib/constants'
import Post from '../types/post'

type Props = {
    allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
    return (
        <>
            <Layout>
                <Head>
                    <title>{BLOG_OWNER} Blog</title>
                </Head>
                <Container>
                    <Intro />
                    {allPosts.length > 0 && <MoreStories posts={allPosts} />}
                </Container>
            </Layout>
        </>
    )
}

export default Index

export const getStaticProps = async () => {
    const allPosts = getAllPosts([
        'title',
        'date',
        'slug',
        'author',
        'coverImage',
        'excerpt',
    ])

    return {
        props: { allPosts },
    }
}
