import { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { getCharacters } from 'services/graphql'
import SearchField from 'components/SearchField'

const Characters = () => {
  const [filter, setFilter] = useState({ page: 1 })
  const {
    data: characters,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    ['characters', filter],
    async (_, filter: any, cursor: string) => {
      const page = cursor || filter.page
      return (await getCharacters({ ...filter, page })).characters
    },
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
