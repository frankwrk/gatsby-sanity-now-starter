import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import link from './objects/link'
import figure from './objects/figure'
import blockContent from './objects/block-content'

import * as siteSettings from './documents/site-settings'

import * as blogPost from './collections/blog-post'

export default createSchema({
  name: 'default',
  types: [
    ...schemaTypes,

    // Global objects
    link,
    figure,
    blockContent,

    // Documents
    ...Object.values(siteSettings),

    // Collections
    ...Object.values(blogPost),
  ],
})
