const plugins = [
  {
    resolve: 'gatsby-source-sanity',
    options: {
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      token: process.env.SANITY_TOKEN,
      overlayDrafts: false,
      watchMode: process.env.NODE_ENV !== 'production',
    },
  },
  'gatsby-plugin-react-helmet',
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-theme-ui',
  'gatsby-plugin-offline',
]

export default plugins
