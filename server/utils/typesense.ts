import Typesense from 'typesense'

const typesenseClientSingleton = () => {
  return new Typesense.Client({
    nodes: [{ host: process.env.TYPESENSE_HOST!, port: process.env.TYPESENSE_PORT!, protocol: 'http' }],
    apiKey: process.env.TYPESENSE_API_KEY!,
  })
}

declare const globalThis: {
  typesenseGlobal: ReturnType<typeof typesenseClientSingleton>
} & typeof global

const typesense = globalThis.typesenseGlobal ?? typesenseClientSingleton()

export default typesense

if (process.env.NODE_ENV !== 'production') globalThis.typesenseGlobal = typesense
