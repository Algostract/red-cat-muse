import Typesense from 'typesense'

const typesense = new Typesense.Client({
  nodes: [{ host: process.env.SEARCH_DATABASE_HOST!, port: parseInt(process.env.SEARCH_DATABASE_PORT!), protocol: 'http' }],
  apiKey: process.env.SEARCH_DATABASE_KEY!,
})

export default typesense
