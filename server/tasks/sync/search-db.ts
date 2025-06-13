import { Client } from '@notionhq/client'

let notion: Client

export default defineTask({
  meta: {
    name: 'sync:search-db',
    description: 'Sync notion resources into search db',
  },
  async run() {
    console.log('Running Task sync:search-db...')

    const config = useRuntimeConfig()
    if (!config.private.notionApiKey) {
      throw new Error('Notion API Key Not Found')
    }

    const notionDbId = config.private.notionDbId as unknown as NotionDB

    notion = notion ?? new Client({ auth: config.private.notionApiKey })

    const data = await notion.databases.query({
      database_id: notionDbId.model,
    })
    const models = data.results as unknown as NotionModel[]

    const documents = models
      .map(({ id, properties }): Omit<Model, 'image' | 'url' | 'isFavorite'> | null => {
        const title = notionTextStringify(properties.Name.title)
        return {
          id,
          name: title,
          // image: (cover?.type === 'external' ? cover.external.url.split('/')[3] : undefined) ?? (cover?.type === 'file' ? cover.file.url : undefined),
          rating: 0,
          reviewCount: 0,
          coordinate: [88.4306945 + Math.random() / 10, 22.409649 + Math.random() / 10],
          isFeatured: false,
        }
      })
      .filter((item) => item !== null)

    // Check if collection exists
    let collectionExists = false
    try {
      await typesense.collections('models').retrieve()
      collectionExists = true
    } catch {
      collectionExists = false
    }

    // Create collection if it doesn't exist
    if (!collectionExists) {
      await typesense.collections().create({
        name: 'models',
        fields: [
          { name: 'id', type: 'string' },
          { name: 'name', type: 'string', sort: true },
          { name: 'rating', type: 'float' },
          { name: 'reviewCount', type: 'int32' },
          { name: 'isFeatured', type: 'bool', optional: true },
          { name: 'coordinate', type: 'geopoint' },
        ],
        default_sorting_field: 'rating',
      })
    }

    // Upsert documents (update if exists, create if not)
    await typesense.collections('models').documents().import(documents, { action: 'upsert' })

    return { result: 'success' }
  },
})
