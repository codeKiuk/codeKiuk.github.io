import * as React from 'react'
import { Link, graphql } from 'gatsby'

import { Bio } from '../components/Bio'
import { Seo } from '../components/Seo'
import { Container } from 'components/common/Container/Container'
import { Column } from 'components/common/Column'
import { Space } from 'components/common/Space'
import { Text } from 'theme-ui'
import colors from 'constants/colors'
import { Row } from 'components/common/Row'

const BlogPostTemplate = ({ data: { previous, next, site, markdownRemark: post } }) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  return (
    <Container>
      <Space height={[32, 72]} />
      <Link to="/">
        <Text as="h3" sx={{ variant: 'text.heading18bold' }}>
          {siteTitle}
        </Text>
      </Link>
      <Space height={[32, 72]} />

      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <Column as="header">
          <Text as="h1" itemProp="headline">
            {post.frontmatter.title}
          </Text>
          <Text as="p" sx={{ color: colors.gray[[700]] }}>
            {post.frontmatter.date}
          </Text>
        </Column>
        <Text as="section" dangerouslySetInnerHTML={{ __html: post.html }} itemProp="articleBody" />
        <hr />

        <Column as="footer">
          <Bio />
        </Column>
      </article>
      <Column as="nav">
        <Row
          as="ul"
          sx={{
            flexWrap: `nowrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
          }}
        >
          <Row as="li">
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <Text as="h5" sx={{ color: colors.gray[700], variant: 'text.heading14bold' }}>
                  ← {previous.frontmatter.title}
                </Text>
              </Link>
            )}
          </Row>
          <Row as="li">
            {next && (
              <Link to={next.fields.slug} rel="next">
                <Text as="h5" sx={{ color: colors.gray[700], variant: 'text.heading14bold' }}>
                  {next.frontmatter.title} →
                </Text>
              </Link>
            )}
          </Row>
        </Row>
      </Column>
      <Space height={[32, 72]} />
    </Container>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return <Seo title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
