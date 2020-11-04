import React, { FC } from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import CssBaseline from '@material-ui/core/CssBaseline'
import MainApp from 'components/MainApp'
import { ThemeProvider } from '@material-ui/core';
import theme from 'services/theme'
import { ProvideAuth } from 'hooks/firebase';

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
          <ProvideAuth>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <MainApp>
                <Component {...pageProps} />
              </MainApp>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </ProvideAuth>
        </Hydrate>
      </ReactQueryCacheProvider>
    </React.Fragment>
  )
}

export default App
