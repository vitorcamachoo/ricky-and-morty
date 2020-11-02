const {
  REST = 'https://rickandmortyapi.com/api',
  GRAPH = 'https://rickandmortyapi.com/graphql',
} = process.env

module.exports = {
  env: {
    rest: REST,
    graphql: GRAPH,
  },

  images: {
    domains: ['rickandmortyapi.com'],
  },

  async rewrites() {
    return [
      {
        source: '/api/rest/:path*',
        destination: `${REST}/:path*`,
      },
      {
        source: '/api/graphql',
        destination: `${GRAPH}`,
      },
    ]
  },
}
