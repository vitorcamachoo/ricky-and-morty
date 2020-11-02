import qs from 'query-string'
import { useState } from 'react'
import { getCharacters } from 'services/rest'
import { useInfiniteQuery } from 'react-query'
import SearchField from 'components/SearchField'
import CharacterList from 'components/CharacterList'
import Character, { CharacterProps } from 'components/Character'
import { Grid, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    marginBottom: theme.spacing(3)
  }
}))

const Characters = () => {
  const classes = useStyles()
  const [filter, setFilter] = useState({ page: 1 })
  const charactersResult = useInfiniteQuery(
    ['characters', filter],
    (_, params: any, cursor: string) =>
      getCharacters({
        params:
          typeof cursor === 'string'
            ? qs.parse(new URL(cursor).search)
            : params,
      }),
    {
      getFetchMore: ({ info }) => info.next,
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

export default Characters
