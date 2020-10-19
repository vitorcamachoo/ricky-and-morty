import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(
  typeof window === 'undefined' ? process.env.graph! : '/graphql',
)

export class Api {
  static request(query) {
    try {
      return (variables) => client.request(query, variables)
    } catch (error) {
      return error
    }
  }
}

export default client
