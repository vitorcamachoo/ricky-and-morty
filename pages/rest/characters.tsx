import qs from 'query-string'
import { FC, useState } from 'react'
import { getCharacters } from 'services/rest'
import { useInfiniteQuery } from 'react-query'
import SearchField from 'components/SearchField'

const Characters: FC = () => {
  const [filter, setFilter] = useState({ page: 1 })
  const {
    data: characters,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
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
    <>
      <SearchField
        label="Search by Characters"
        onSubmit={(values) => setFilter({ ...filter, ...values })}
      />
      <p>Characters</p>
      {characters && characters.length > 0 ? (
        <>
          {characters?.map((group) =>
            group.results.map((character) => (
              <p key={character.id}>
                {character.id} - {character.name}{' '}
              </p>
            )),
          )}
          <div>
            <button
              onClick={() => fetchMore()}
              disabled={!canFetchMore || !!isFetchingMore}
            >
              {isFetchingMore
                ? 'Loading more...'
                : canFetchMore
                ? 'Load More'
                : 'Nothing more to load'}
            </button>
          </div>
        </>
      ) : null}
    </>
  )
}

export default Characters
