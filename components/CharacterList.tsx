import React from 'react'
import { InfiniteQueryResult } from 'react-query'
import { Button, Grid, makeStyles } from '@material-ui/core'
import { ApiResponse } from 'services/rest-client'



export interface CharactersListProps<T> extends InfiniteQueryResult<ApiResponse<T>> {
    children: (character: T, index: number) => JSX.Element
}

const useStyle = makeStyles((theme) => ({
    loadButton: {
        width: '50%',
        margin: theme.spacing(2)
    }
}))

const CharactersList = <T extends { id: string | number },>({
    children,
    data,
    fetchMore,
    canFetchMore,
    isFetchingMore
}: CharactersListProps<T>) => {
    const classes = useStyle()

    return (
        <>
            <Grid container spacing={4}>
                {data?.map((group) => group.results.map((item, index) => (
                    <Grid key={item.id} item xl={3} lg={4} md={6} sm={12}>
                        {children(item, index)}
                    </Grid>
                )))}
            </Grid >
            <Button
                color="secondary"
                variant="contained"
                onClick={() => fetchMore()}
                disabled={!canFetchMore || !!isFetchingMore}
                className={classes.loadButton}
            >
                {isFetchingMore
                    ? 'Loading more...'
                    : canFetchMore
                        ? `Load More`
                        : 'Nothing more to load'}
            </Button>
        </>
    )
}

export default CharactersList
