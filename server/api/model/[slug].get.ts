import { Client } from '@notionhq/client'
import { z } from 'zod'

let notion: Client

export default defineEventHandler<Promise<Model>>(async (event) => {
  try {
    const config = useRuntimeConfig()
    if (!config.private.notionApiKey) {
      throw new Error('Notion API Key Not Found')
    }

    const { slug } = await getValidatedRouterParams(
      event,
      z.object({
        slug: z.string().min(1),
      }).parse
    )

    const [name, _ext] = slug.split('.')
    const pageId = name?.split('_').at(-1)

    if (!pageId) {
      throw createError({ statusCode: 404, statusMessage: `pageId ${slug} not found` })
    }

    notion = notion ?? new Client({ auth: config.private.notionApiKey })

    const content = (await notion.pages.retrieve({ page_id: pageId })) as unknown as NotionModel
    if (!content || content.properties.Status.status.name !== 'Live') {
      throw createError({ statusCode: 404, statusMessage: `model id ${slug} not found` })
    }

    const id = content.id
    const title = notionTitleStringify(content.properties.Name.title)

    return {
      id,
      name: title,
      image: (content.cover?.type === 'external' ? content.cover.external.url.split('/')[3] : undefined) ?? (content.cover?.type === 'file' ? content.cover.file.url : undefined),
      rating: 0,
      reviewCount: 0,
      coordinate: [88.4306945 + Math.random() / 10, 22.409649 + Math.random() / 10],
      isFeatured: false,
      url: `/model/${slugify(title)}_${id}`,
    }
  } catch (error) {
    console.error('API model/index GET', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
