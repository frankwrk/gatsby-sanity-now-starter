/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql, Link } from 'gatsby'

import routes from '../config/routes'
import Layout from '../layout'
import SEO from '../components/seo'
import BlogPost from '../components/blog-post'

const BlogPostTemplate = ({ data }) => {
  const { title, excerpt, slug, image } = data.blogPost

  return (
    <Layout>
      <SEO
        title={title}
        description={excerpt}
        url={routes.blogPost(slug.current)}
        image={image?.asset?.url}
      />
      <Styled.a as={Link} to="/">
        <span role="img" aria-label="back">
          👈🏻
        </span>{' '}
        Back to posts
      </Styled.a>

      <BlogPost {...data.blogPost} full sx={{ mt: 4 }} />
    </Layout>
  )
}

export const query = graphql`
  query getBlogPost($slug: String!) {
    blogPost: sanityBlogPost(slug: { current: { eq: $slug } }) {
      id
      image {
        asset {
          url
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
      title
      createdAt: _createdAt(formatString: "MMMM DD, YYYY")
      excerpt
      body: _rawBody
      slug {
        current
      }
    }
  }
`

export default BlogPostTemplate
