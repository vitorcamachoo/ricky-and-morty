import qs from 'query-string'
import { FC, useState } from 'react'
import { getLocations } from 'services/rest'
import { useInfiniteQuery } from 'react-query'
import SearchField from 'components/SearchField'

const Location: FC = () => {
  const [filter, setFilter] = useState({})
  const {
    data: locations,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    ['locations', filter],
    (_, params: any, cursor: string) =>
      getLocations({
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
