import { Client } from '@notionhq/client'

let notion: Client

export default defineEventHandler<Promise<Model[]>>(async (event) => {
  try {
    const config = useRuntimeConfig()
    if (!config.private.notionApiKey) {
      throw new Error('Notion API Key Not Found')
    }

    const searchParams = getQuery<SearchParams>(event)

    const response = await typesense.collections<Model>('models').documents().search({
      q: searchParams.query,
      query_by: searchParams.queryBy,
      filter_by: searchParams.filterBy, // e.g. "isFeatured:=true"
      sort_by: searchParams.sortBy,
      per_page: searchParams.perPage,
    })

    const notionDbId = config.private.notionDbId as unknown as NotionDB

    notion = notion ?? new Client({ auth: config.private.notionApiKey })

    const data = await notion.databases.query({
      database_id: notionDbId.model,
    })
    const models = data.results as unknown as NotionModel[]

    const results = models.map(({ id, properties, cover }): Model | null => {
      const title = notionTitleStringify(properties.Name.title)
      return {
        id,
        name: title,
        image: (cover?.type === 'external' ? cover.external.url.split('/')[3] : undefined) ?? (cover?.type === 'file' ? cover.file.url : undefined),
        rating: 0,
        reviewCount: 0,
        coordinate: [88.4306945 + Math.random() / 10, 22.409649 + Math.random() / 10],
        isFeatured: false,
        url: `/model/${slugify(title)}_${id}`,
      }
    })

    return (response.hits?.map(({ document }) => results.find((item) => item?.id === document.id)) ?? []) as Model[]
  } catch (error) {
    console.error('API model/index GET', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
