/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

const Footer = () => {
  return (
    <footer sx={{ variant: 'layout.footer' }}>
      Made with{' '}
      <span role="img" aria-label="love">
        ❤️
      </span>{' '}
      by{' '}
      <Styled.a
        href="https://kevinwolf.me"
        target="_blank"
        rel="noopener noreferrer"
      >
        Kevin Wolf
      </Styled.a>
    </footer>
  )
}

export default Footer
