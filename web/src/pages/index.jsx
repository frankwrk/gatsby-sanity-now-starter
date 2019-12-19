/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../layout'
import SEO from '../components/seo'
import BlogPost from '../components/blog-post'

const HomePage = () => {
  const { blogPosts } = useStaticQuery(graphql`
    {
      blogPosts: allSanityBlogPost(sort: { fields: _createdAt, order: DESC }) {
        nodes {
          id
          image {
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
          }
          title
          createdAt: _createdAt(formatString: "MMMM DD, YYYY")
          excerpt
          slug {
            current
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO />

      {blogPosts.nodes.length ? (
        <section>
          {blogPosts.nodes.map(({ id, ...blogPost }) => (
            <BlogPost {...blogPost} key={id} sx={{ mt: 4 }} />
          ))}
        </section>
      ) : (
        <Styled.p>There are no blog posts to display</Styled.p>
      )}
    </Layout>
  )
}

export default HomePage
