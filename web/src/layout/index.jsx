/** @jsx jsx */
import React from 'react'
import { jsx, Styled } from 'theme-ui'
import { Global, css } from '@emotion/core'

import Header from './header'
import Footer from './footer'

const Layout = ({ children }) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [result, setResult] = React.useState(null)

  const handleTestAPI = () => {
    setIsFetching(true)
    setResult(null)

    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => {
        setIsFetching(false)
        setResult(data)
      })
  }

  return (
    <React.Fragment>
      <Global
        styles={(theme) => css`
          body {
            -webkit-font-smoothing: antialiased;
            background-color: ${theme.colors.background};
            margin: 0;
          }
        `}
      />

      <Styled.root sx={{ variant: 'layout.root' }}>
        <Header />
        <main sx={{ variant: 'layout.main' }}>
          <div sx={{ variant: 'layout.container' }}>
            <div
              sx={{
                bg: 'backgroundContrast',
                p: 4,
                textAlign: 'center',
                mb: 4,
              }}
            >
              <button
                disabled={isFetching}
                type="button"
                sx={{ variant: 'button.default' }}
                onClick={handleTestAPI}
              >
                Test API call
              </button>

              {result ? (
                <Styled.pre sx={{ mt: 3 }}>
                  {JSON.stringify(result, null, 2)}
                </Styled.pre>
              ) : null}
            </div>
            {children}
          </div>
        </main>
        <Footer />
      </Styled.root>
    </React.Fragment>
  )
}

export default Layout
