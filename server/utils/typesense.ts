import Typesense from 'typesense'

const typesense = new Typesense.Client({
  nodes: [{ host: process.env.TYPESENSE_HOST!, port: process.env.TYPESENSE_PORT!, protocol: 'http' }],
  apiKey: process.env.TYPESENSE_API_KEY!,
})

export default typesense
