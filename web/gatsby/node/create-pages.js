import path from 'path'

import routes from '../../src/config/routes'

const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      blogPosts: allSanityBlogPost {
        nodes {
          id
          title
          slug {
            current
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  const blogPostTemplate = path.resolve('src/templates/blog-post.jsx')
  result.data.blogPosts.nodes.forEach((post) => {
    const slug = post.slug.current

    createPage({
      path: routes.blogPost(slug),
      component: blogPostTemplate,
      context: {
        slug,
      },
    })
  })
}

export default createPages
