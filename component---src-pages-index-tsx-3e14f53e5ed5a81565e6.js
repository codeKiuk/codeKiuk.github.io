'use strict'
;(self.webpackChunkgatsby_starter_blog = self.webpackChunkgatsby_starter_blog || []).push([
  [691],
  {
    7200: function (e, t, l) {
      l.r(t),
        l.d(t, {
          Head: function () {
            return i
          },
        })
      var n = l(7294),
        r = l(1883),
        a = l(3273),
        o = l(5058),
        s = l(5131)
      t.default = (e) => {
        var t
        let { data: l, location: s } = e
        const i = (null === (t = l.site.siteMetadata) || void 0 === t ? void 0 : t.title) || 'Title',
          c = l.allMarkdownRemark.nodes
        return 0 === c.length
          ? n.createElement(
              o.A,
              { location: s, title: i },
              n.createElement(a.w, null),
              n.createElement(
                'p',
                null,
                'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).'
              )
            )
          : n.createElement(
              o.A,
              { location: s, title: i },
              n.createElement(a.w, null),
              n.createElement(
                'ol',
                { sx: { flexDirection: 'column', listStyle: 'none' } },
                c.map((e) => {
                  const t = e.frontmatter.title || e.fields.slug
                  return n.createElement(
                    'li',
                    { key: e.fields.slug },
                    n.createElement(
                      'article',
                      { className: 'post-list-item', itemScope: !0, itemType: 'http://schema.org/Article' },
                      n.createElement(
                        'header',
                        null,
                        n.createElement(
                          'h2',
                          null,
                          n.createElement(
                            r.Link,
                            { to: e.fields.slug, itemProp: 'url' },
                            n.createElement('span', { itemProp: 'headline' }, t)
                          )
                        ),
                        n.createElement('small', null, e.frontmatter.date)
                      ),
                      n.createElement(
                        'section',
                        null,
                        n.createElement('p', {
                          dangerouslySetInnerHTML: { __html: e.frontmatter.description || e.excerpt },
                          itemProp: 'description',
                        })
                      )
                    )
                  )
                })
              )
            )
      }
      const i = () => n.createElement(s.p, { title: 'All posts' })
    },
  },
])
//# sourceMappingURL=component---src-pages-index-tsx-3e14f53e5ed5a81565e6.js.map
