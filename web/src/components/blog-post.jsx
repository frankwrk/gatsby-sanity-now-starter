/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import routes from '../config/routes'
import PortableText from './portable-text'

const BlogPost = ({
  full,
  image,
  title,
  createdAt,
  body,
  excerpt,
  slug,
  ...props
}) => {
  return (
    <article sx={{ variant: 'layout.card' }} {...props}>
      {image.asset ? <Img fluid={image.asset.fluid} /> : null}

      <Styled.p sx={{ m: 0, color: 'textSecondary', mt: 6 }}>
        {createdAt}
      </Styled.p>

      <Styled.h1 sx={{ m: 0, mt: 1 }}>{title}</Styled.h1>

      <div sx={{ mt: 4 }}>
        {!full || !body ? (
          <Styled.p sx={{ m: 0 }}>{excerpt}</Styled.p>
        ) : (
          <PortableText>{body}</PortableText>
        )}
      </div>

      {!full ? (
        <Styled.a
          as={Link}
          to={routes.blogPost(slug.current)}
          sx={{ display: 'block', mt: 4, textAlign: 'right' }}
        >
          Read post{' '}
          <span role="img" aria-label="read">
            👉🏻
          </span>
        </Styled.a>
      ) : null}
    </article>
  )
}

export default BlogPost
