import { Api } from './rest-client'

export const getCharacters = Api.get('character')
export const getLocations = Api.get('location')
export const getEpisodes = Api.get('episode')
