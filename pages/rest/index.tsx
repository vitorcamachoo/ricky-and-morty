import qs from 'query-string'
import { FC, useState } from 'react'
import { InferGetStaticPropsType } from 'next'
import { getCharacters } from 'services/rest'
import { QueryCache, useInfiniteQuery } from 'react-query'
import SearchField from 'components/SearchField'
import CharacterList from 'components/CharacterList'
import Character, { CharacterProps } from 'components/Character'
import { Grid, makeStyles, Theme } from '@material-ui/core'
import { dehydrate } from 'react-query/hydration'

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    marginBottom: theme.spacing(3)
  }
}))

const Characters: FC<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  const classes = useStyles()
  const [filter, setFilter] = useState({ page: 1 })
  const charactersResult = useInfiniteQuery(
    ['characters', filter],
    (_, params: any, cursor: any) => getCharacters({ ...params, ...cursor }),
    {
      getFetchMore: ({ info }) => info.next && qs.parse(new URL(info.next).search),
    },
  )

  return (
    <Grid container direction="row" justify="center">
      <Grid item xs={6} className={classes.search}>
        <SearchField
          label="Search by Characters"
          onChange={(values) => setFilter({ ...filter, ...values })}
        />
      </Grid>
      {charactersResult.data && charactersResult.data.length > 0 ? (
        <CharacterList<CharacterProps> {...charactersResult}>
          {(character) => (
            <Character key={character.id} {...character} />
          )}
        </ CharacterList>
      ) : null}
    </Grid>
  )
}

export async function getStaticProps() {
  const queryCache = new QueryCache()

  await queryCache.prefetchQuery(['characters', { page: 1 }], getCharacters)
  await queryCache.prefetchQuery(['characters', { page: 2 }], getCharacters)

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
    revalidate: 1,
  }
}

export default Characters
