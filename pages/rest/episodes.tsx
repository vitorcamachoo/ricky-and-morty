import qs from 'query-string'
import { useState } from "react"
import { getEpisodes } from 'services/rest'
import { useInfiniteQuery } from "react-query"
import SearchField from "components/SearchField"

const Episodes = () => {
    const [filter, setFilter] = useState({})
    const {
        data: episodes,
        isFetchingMore,
        fetchMore,
        canFetchMore
    } = useInfiniteQuery(['episodes', filter],
        (_, params: object, cursor: string) => getEpisodes({
            params: typeof cursor === 'string'
                ? qs.parse(new URL(cursor).search)
                : params
        }),
        {
            getFetchMore: ({ info }) => info.next,
        })

    return (
        <>
            <SearchField
                label="Search by Episodes"
                onSubmit={(values) => setFilter({ ...filter, ...values })}
            />
            <p>Episodes</p>
            {
                episodes && episodes.length > 0
                    ? (
                        <>

                            {
                                episodes?.map((group) => (
                                    group.results.map((episode) => (
                                        <p key={episode.id}>{episode.id} - {episode.name} </p>
                                    ))
                                ))
                            }
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
                    )
                    : null
            }
        </>
    )
}

export default Episodes