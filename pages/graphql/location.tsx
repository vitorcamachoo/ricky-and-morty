import { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { getLocations } from 'services/graphql'
import SearchField from 'components/SearchField'

const Location = () => {
  const [filter, setFilter] = useState({ page: 1 })
  const {
    data: locations,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    ['episodes', filter],
    async (_, filter: any, cursor: string) => {
      const page = cursor || filter.page
      return (await getLocations({ ...filter, page })).locations
    },
    {
      getFetchMore: ({ info }) => info.next,
    },
  )


  return (
    <>
      <SearchField
        label="Search by Locations"
        onSubmit={(values) => setFilter({ ...filter, ...values })}
      />
      <p>Locations</p>
      {locations && locations.length > 0 ? (
        <>
          {locations?.map((group) =>
            group.results.map((location) => (
              <p key={location.id}>
                {location.id} - {location.name}{' '}
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

export default Location
