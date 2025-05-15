import { Client } from '@notionhq/client'
import notionTitleStringify from '~~/server/utils/notion-title-stringify'

let notion: Client

export default defineEventHandler<Model[]>(async () => {
  try {
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

    const results = models.map(({ id, properties, cover }): Model | null => {
      return {
        id,
        name: notionTitleStringify(properties.Name.title),
        image: (cover?.type === 'external' ? cover.external.url.split('/')[3] : undefined) ?? (cover?.type === 'file' ? cover.file.url : undefined),
        rating: 0,
        reviewCount: 0,
        coordinate: { lat: 88.4306945 + Math.random() / 10, lng: 22.409649 + Math.random() / 10 },
        isFavorite: false,
        isFeatured: false,
      }
    })

    return results.filter((item) => item !== null).toSorted((a, b) => b.rating - a.rating)
  } catch (error) {
    console.error('API model/index GET', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
