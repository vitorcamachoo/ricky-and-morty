import { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { getEpisodes } from 'services/graphql'
import SearchField from 'components/SearchField'

const Episodes = () => {
  const [filter, setFilter] = useState({ page: 1 })
  const {
    data: episodes,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    ['episodes', filter],
    async (_, filter: any, cursor: string) => {
      const page = cursor || filter.page
      return (await getEpisodes({ ...filter, page })).episodes
    },
    {
      getFetchMore: ({ info }) => info.next,
    },
  )

  return (
    <>
      <SearchField
        label="Search by Episodes"
        onSubmit={(values) => setFilter({ ...filter, ...values })}
      />
      <p>Episodes</p>
      {episodes && episodes.length > 0 ? (
        <>
          {episodes?.map((group) =>
            group.results.map((episode) => (
              <p key={episode.id}>
                {episode.id} - {episode.name}{' '}
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

export default Episodes
