
import React, { FC, useEffect } from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import CssBaseline from '@material-ui/core/CssBaseline';
import MainApp from 'components/MainApp';


const queryCache = new QueryCache()
interface AppProps {
    Component: FC<{
        dehydratedState: object
    }>
    pageProps: {
        dehydratedState: object
    }
}

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <React.Fragment>
            <ReactQueryCacheProvider queryCache={queryCache}>
                <Hydrate state={pageProps.dehydratedState}>
                    <CssBaseline />
                    <ReactQueryDevtools initialIsOpen={false} />
                    <MainApp>
                        <Component {...pageProps} />
                    </MainApp>
                </Hydrate>
            </ReactQueryCacheProvider>
        </React.Fragment >
    )
}


export default App