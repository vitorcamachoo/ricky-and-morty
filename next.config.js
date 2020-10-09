const {
  REST = 'https://rickandmortyapi.com/api',
  GRAPH = 'https://rickandmortyapi.com/graphql',
} = process.env

module.exports = {
  env: {
    rest: REST,
    graphql: GRAPH,
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${REST}/:path*`,
      },
      {
        source: '/graphql',
        destination: `${GRAPH}`,
      },
    ]
  },
}
