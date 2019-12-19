/* eslint-disable no-underscore-dangle, react/destructuring-assignment */
/** @jsx jsx */
import React from 'react'
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'
import imgUrlBuilder from '@sanity/image-url'

import sanityJSON from 'studio/sanity.json'

function imageUrlFor(source) {
  const builder = imgUrlBuilder(sanityJSON.api)
  return builder.image(source)
}

function buildImageObj(source) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id },
  }

  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj
}

const serializers = {
  container: React.Fragment,
  types: {
    block: ({ node, children }) => {
      const Component =
        !node.style || node.style !== 'normal' ? Styled[node.style] : Styled.p
      return <Component>{children}</Component>
    },
    figure: ({ node }) => (
      <figure sx={{ m: '2rem 0', p: 0, textAlign: 'center' }}>
        {node.asset ? (
          <img
            src={imageUrlFor(buildImageObj(node)).url()}
            alt={node.alt}
            sx={{ width: node.width || '100%', height: node.height || 'auto' }}
          />
        ) : null}
        {node.caption ? (
          <figcaption sx={{ mt: '0.5rem', fontStyle: 'italic' }}>
            {node.caption}
          </figcaption>
        ) : null}
      </figure>
    ),
  },
  marks: {
    strong: Styled.strong,
    em: Styled.em,
    code: Styled.code,
    link: ({ mark, children }) => {
      const { external, blank, href } = mark
      const Component = external ? Styled.a : Link
      const linkProps = {}
      linkProps[external ? 'href' : 'to'] = href
      if (blank) {
        linkProps.target = '_blank'
        linkProps.rel = 'noopener noreferrer'
      }
      return (
        <Component
          sx={{ variant: 'styles.a' }}
          component="button"
          {...linkProps}
        >
          {children}
        </Component>
      )
    },
  },
  list: ({ type, children }) => {
    const Component = Styled[type === 'bullet' ? 'ul' : 'ol']
    return <Component>{children}</Component>
  },
  listItem: (props) => {
    const children =
      !props.node.style || props.node.style === 'normal'
        ? props.children
        : React.createElement(
            props.serializers.types.block,
            props,
            props.children
          )
    return <Styled.li>{children}</Styled.li>
  },
}

export default serializers
