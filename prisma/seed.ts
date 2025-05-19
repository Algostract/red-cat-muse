import prisma from '../server/utils/prisma'
import typesense from '../server/utils/typesense'
import type { Model } from '../shared/types'

async function createModels() {
  /*   const user = await prisma.user.create({
      data: {
        name:  'John Doe',
        email: 'john.doe@example.com',
      },
    })
  
    console.log('Seeded user (Prisma):', user) */

  const documents: Omit<Model, 'image' | 'url' | 'isFavorite'>[] = [
    {
      id: '1ea15a2f-8cf0-8036-a209-e7c56e2ef524',
      name: 'Rajanaya Bhadra',
      rating: 0,
      reviewCount: 0,
      coordinate: [88.44708199321187, 22.490194681494444],
      isFeatured: true,
    },
  ]

  // await typesense.collections('models').delete()

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

  await typesense.collections('models').documents().import(documents)
}

// 5. Main runner: ensure collection, create seed users, then disconnect
async function main() {
  await createModels()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
