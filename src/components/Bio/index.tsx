/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { Text } from 'theme-ui'
import colors from '../../constants/colors'
import { Column } from 'components/common/Column'
import { Row } from 'components/common/Row'
import { Space } from 'components/common/Space'

export const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  // const social = data.site.siteMetadata?.social

  return (
    <Row>
      <StaticImage
        layout="fixed"
        formats={['auto', 'webp', 'avif']}
        src="../../images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
        sx={{
          minWidth: 50,
          borderRadius: '100%',
        }}
      />
      <Space width={4} />
      {author?.name && (
        <Column>
          <Row>
            <Text as="span" sx={{ variant: 'text.heading16bold', color: colors.gray[800] }}>
              {author?.summary || null}
            </Text>
            <Space width={4} />
            <a href={`https://github.com/${author.name}`}>{`${author.name}`}</a>
            <span>,</span>
          </Row>
          <Text as={'p'} sx={{ variant: 'text.heading16regular', color: colors.gray[800] }}>
            with dev things and daily life.
          </Text>
        </Column>
      )}
    </Row>
  )
}
