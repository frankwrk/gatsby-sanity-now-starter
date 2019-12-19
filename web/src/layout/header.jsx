/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'

const Header = () => {
  const { siteSettings } = useStaticQuery(graphql`
    {
      siteSettings: sanitySiteSettings(
        _id: { regex: "/(drafts.|)siteSettings/" }
      ) {
        title
      }
    }
  `)
  return (
    <header sx={{ variant: 'layout.header' }}>
      <div sx={{ variant: 'layout.container', py: 0 }}>
        <Styled.h1 sx={{ color: 'inherit', m: 0 }}>
          {siteSettings?.title}
        </Styled.h1>
      </div>
    </header>
  )
}

export default Header
