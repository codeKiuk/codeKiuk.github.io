import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { Bio } from '../components/Bio'
import { Seo } from '../components/Seo'
import { Space } from 'components/common/Space'
import { Container } from 'components/common/Container/Container'
import { Text } from 'theme-ui'
import colors from 'constants/colors'
import { Column } from 'components/common/Column'
import { Row } from 'components/common/Row'

type BlogIndexProps = {
  data: any
  location: Location
}

const BlogIndex: React.FC<BlogIndexProps> = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Container>
      <Space height={[32, 48]} />
      <Text as="h1" sx={{ color: colors.gray[900], variant: 'texts.display38bold' }}>
        <Link to="/">{siteTitle}</Link>
      </Text>

      <Space height={[32]} />

      <Bio />

      <Space height={[32, 48]} />

      <Column as="ol" sx={{ listStyle: `none` }}>
        {posts.map((post: any) => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <Column as="li" key={post.fields.slug}>
              <Space height={[64, 72]} />
              <Column as="article" itemScope itemType="http://schema.org/Article">
                <Column as="header">
                  <Link to={post.fields.slug} itemProp="url">
                    <Text as="h2" sx={{ '&:hover': { color: colors.primary[500] } }} itemProp="headline">
                      {title}
                    </Text>
                  </Link>

                  <Space height={[16]} />

                  <Text as="small">{post.frontmatter.date}</Text>
                </Column>
                <Space height={[20]} />
                <Row as="section">
                  <Text
                    as="p"
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </Row>
              </Column>
            </Column>
          )
        })}
      </Column>
      <Space height={[60, 120]} />
    </Container>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Blog" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
