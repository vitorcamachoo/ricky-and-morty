import React, { FC } from 'react'
import Head from 'next/head';
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import CssBaseline from '@material-ui/core/CssBaseline'
import MainApp from 'components/MainApp'
import { ThemeProvider } from '@material-ui/core';
import theme from 'services/theme'

const queryCache = new QueryCache()
interface AppProps {
  Component: FC<{
    dehydratedState: any
  }>
  pageProps: {
    dehydratedState: any
  }
}

const App: FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <meta name="theme-color" content={theme.palette.primary.main} />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainApp>
              <Component {...pageProps} />
            </MainApp>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </ReactQueryCacheProvider>
    </React.Fragment>
  )
}

export default App
