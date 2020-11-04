const { NEXT_PUBLIC_REST, NEXT_PUBLIC_GRAPH } = process.env

module.exports = {
  devIndicators: {
    autoPrerender: true,
  },

  images: {
    domains: ['rickandmortyapi.com'],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/rest',
        permanent: true,
      },
    ]
  },

  async rewrites() {
    return [
      {
        source: '/api/rest/:path*',
        destination: `${NEXT_PUBLIC_REST}/:path*`,
      },
      {
        source: '/api/graphql',
        destination: `${NEXT_PUBLIC_GRAPH}`,
      },
    ]
  },
}
