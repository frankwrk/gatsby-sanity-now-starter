/** @jsx jsx */
import { jsx, ThemeProvider, Styled } from 'theme-ui'
import { BlockEditor } from 'part:@sanity/form-builder'

import theme from 'web/src/gatsby-plugin-theme-ui'

const PortableTextEditor = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Styled.root>
        <BlockEditor {...props} />
      </Styled.root>
    </ThemeProvider>
  )
}

export default PortableTextEditor
