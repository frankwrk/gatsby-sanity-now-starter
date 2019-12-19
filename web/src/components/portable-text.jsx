/** @jsx jsx */
import { jsx } from 'theme-ui'
import BlockContent from '@sanity/block-content-to-react'

import sanityJSON from 'studio/sanity.json'

import serializers from '../utils/sanity-serializers'

const PortableText = ({ children }) => {
  if (!children) return null

  return (
    <BlockContent
      blocks={children}
      serializers={serializers}
      projectId={sanityJSON.api.projectId}
      dataset={sanityJSON.api.dataset}
    />
  )
}

export default PortableText
