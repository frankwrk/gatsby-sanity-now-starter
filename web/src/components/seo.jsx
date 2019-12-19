import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

const SEO = ({
  title: pageTitle,
  description: pageDescription,
  url: pageUrl,
  image: pageImage,
  keywords: pageKeywords,
}) => {
  const { siteSettings } = useStaticQuery(graphql`
    {
      siteSettings: sanitySiteSettings(
        _id: { regex: "/(drafts.|)siteSettings/" }
      ) {
        icon {
          asset {
            url
          }
        }
        title
        description
        url
        image {
          asset {
            url
          }
        }
        keywords
      }
    }
  `)

  const { icon, title, description, url, image, keywords } = siteSettings || {}

  const metaTitle = pageTitle ?? title
  const metaDescription = pageDescription ?? description
  const metaUrl = pageUrl ? `${url}/${pageUrl}` : url
  const metaImage = pageImage ?? image?.asset?.url
  const metaKeywords = pageKeywords ?? keywords

  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={pageTitle ? `${pageTitle} — ${title}` : title}
      link={[
        {
          rel: 'icon',
          type: 'image/png',
          href: icon?.asset?.url,
        },
      ]}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          name: 'url',
          content: metaUrl,
        },
        {
          name: 'image',
          content: metaImage,
        },
        {
          property: 'og:title',
          content: metaTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:url',
          content: metaUrl,
        },
        {
          property: 'og:image',
          content: metaImage,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: metaTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:url',
          content: metaUrl,
        },
        {
          name: 'twitter:image',
          content: metaImage,
        },
      ].concat(
        metaKeywords && metaKeywords.length > 0
          ? {
              name: 'keywords',
              content: metaKeywords.join(', '),
            }
          : []
      )}
    />
  )
}

export default SEO
