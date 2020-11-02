import { gql } from 'graphql-request'
import { Api } from './graphql-client'

export interface Filter {
  page: number
  name?: string
}

export const getCharacters = Api.request(
  gql`
    query Characters($page: Int!, $name: String) {
      characters(page: $page, filter: { name: $name }) {
        info {
          count
          next
        }
        results {
          id
          name
          image
          species
          status
          location {
            name
          }
        }
      }
    }
  `,
)

export const getLocations = Api.request(
  gql`
    query Locations($page: Int!, $name: String) {
      locations(page: $page, filter: { name: $name }) {
        info {
          count
          next
        }
        results {
          id
          name
        }
      }
    }
  `,
)

export const getEpisodes = Api.request(
  gql`
    query Episodes($page: Int!, $name: String) {
      episodes(page: $page, filter: { name: $name }) {
        info {
          count
          next
        }
        results {
          id
          name
        }
      }
    }
  `,
)
