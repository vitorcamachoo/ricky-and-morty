import { gql } from 'graphql-request'
import { Api } from './graphql-client'

export const getCharacters = async (filter) => {
  const { characters: data } = await Api.request(
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
          }
        }
      }
    `,
    filter,
  )

  return data
}

export const getLocations = async (filter) => {
  const { locations: data } = await Api.request(
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
    filter,
  )

  return data
}

export const getEpisodes = async (filter) => {
  const { episodes: data } = await Api.request(
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
    filter,
  )

  return data
}
