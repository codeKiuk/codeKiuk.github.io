'use strict'
;(self.webpackChunkgatsby_starter_blog = self.webpackChunkgatsby_starter_blog || []).push([
  [218],
  {
    5058: function (e, t, n) {
      n.d(t, {
        A: function () {
          return l
        },
      })
      var a = n(7294),
        r = n(1883)
      const l = (e) => {
        let { location: t, title: n, children: l } = e
        const c = '/' === t.pathname
        let o
        return (
          (o = c
            ? a.createElement('h1', { className: 'main-heading' }, a.createElement(r.Link, { to: '/' }, n))
            : a.createElement(r.Link, { className: 'header-link-home', to: '/' }, n)),
          a.createElement(
            'div',
            { className: 'global-wrapper', 'data-is-root-path': c },
            a.createElement('header', { className: 'global-header' }, o),
            a.createElement('main', null, l),
            a.createElement(
              'footer',
              null,
              '© ',
              new Date().getFullYear(),
              ', Built with',
              ' ',
              a.createElement('a', { href: 'https://www.gatsbyjs.com' }, 'Gatsby')
            )
          )
        )
      }
    },
    5131: function (e, t, n) {
      n.d(t, {
        p: function () {
          return l
        },
      })
      var a = n(7294),
        r = n(1883)
      const l = (e) => {
        var t, n, l
        let { description: c, title: o, children: i } = e
        const { site: s } = (0, r.useStaticQuery)('2841359383'),
          m = c || s.siteMetadata.description,
          u = null === (t = s.siteMetadata) || void 0 === t ? void 0 : t.title
        return a.createElement(
          a.Fragment,
          null,
          a.createElement('title', null, u ? o + ' | ' + u : o),
          a.createElement('meta', { name: 'description', content: m }),
          a.createElement('meta', { property: 'og:title', content: o }),
          a.createElement('meta', { property: 'og:description', content: m }),
          a.createElement('meta', { property: 'og:type', content: 'website' }),
          a.createElement('meta', { name: 'twitter:card', content: 'summary' }),
          a.createElement('meta', {
            name: 'twitter:creator',
            content:
              (null === (n = s.siteMetadata) || void 0 === n || null === (l = n.social) || void 0 === l
                ? void 0
                : l.twitter) || '',
          }),
          a.createElement('meta', { name: 'twitter:title', content: o }),
          a.createElement('meta', { name: 'twitter:description', content: m }),
          i
        )
      }
    },
    2513: function (e, t, n) {
      n.r(t),
        n.d(t, {
          Head: function () {
            return c
          },
        })
      var a = n(7294),
        r = n(5058),
        l = n(5131)
      const c = () => a.createElement(l.p, { title: '404: Not Found' })
      t.default = (e) => {
        let { data: t, location: n } = e
        const l = t.site.siteMetadata.title
        return a.createElement(
          r.A,
          { location: n, title: l },
          a.createElement('h1', null, '404: Not Found'),
          a.createElement('p', null, "You just hit a route that doesn't exist... the sadness.")
        )
      }
    },
  },
])
//# sourceMappingURL=component---src-pages-404-tsx-62e095d14fd6ff4c53f5.js.map
