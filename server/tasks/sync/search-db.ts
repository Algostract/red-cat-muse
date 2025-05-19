import { Client } from '@notionhq/client'

let notion: Client

export default defineTask({
  meta: {
    name: 'sync:resource',
    description: 'Sync notion resources into search db',
  },
  async run() {
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
      .map(({ id, properties }): Omit<Model, 'image' | 'isFavorite'> | null => {
        const title = notionTitleStringify(properties.Name.title)
        return {
          id,
          name: title,
          // image: (cover?.type === 'external' ? cover.external.url.split('/')[3] : undefined) ?? (cover?.type === 'file' ? cover.file.url : undefined),
          rating: 0,
          reviewCount: 0,
          coordinate: [88.4306945 + Math.random() / 10, 22.409649 + Math.random() / 10],
          isFeatured: false,
          url: `/model/${slugify(title)}_${id}`,
        }
      })
      .filter((item) => item !== null)

    try {
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
    } catch {
      console.warn('Collection already exist')
    }

    await typesense.collections('models').documents().import(documents)

    return { result: 'success' }
  },
})
