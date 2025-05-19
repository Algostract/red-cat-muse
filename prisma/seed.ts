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
      id: '1f515a2f-8cf0-803a-9d6d-fb7e2c685ea9',
      name: 'Senjuti Das',
      rating: 0,
      reviewCount: 0,
      coordinate: [88.44494573473654, 22.470786218371966],
      isFeatured: true,
    },
    {
      id: '1ea15a2f-8cf0-8036-a209-e7c56e2ef524',
      name: 'Rajanaya Bhadra',
      rating: 0,
      reviewCount: 0,
      coordinate: [88.44708199321187, 22.490194681494444],
      isFeatured: true,
    },
    {
      id: '1e315a2f-8cf0-80d6-91ea-ea11ea614e98',
      name: 'Simran Das',
      rating: 0,
      reviewCount: 0,
      coordinate: [88.48464688911143, 22.509536868557376],
      isFeatured: false,
    },
    {
      id: '1e315a2f-8cf0-808c-a28f-c9c888efa075',
      name: 'Sayani Das',
      rating: 0,
      reviewCount: 0,
      coordinate: [88.51685689620531, 22.45671194962068],
      isFeatured: false,
    },
    {
      id: '1e315a2f-8cf0-805d-9e34-e7ebcf7ad26b',
      name: 'Deep Sarkar',
      rating: 0,
      reviewCount: 0,
      coordinate: [88.5190144724808, 22.43872196195904],
      isFeatured: false,
    },
    {
      id: '1e315a2f-8cf0-80fe-808a-c554a008d8ed',
      name: 'Subham Mukherjee',
      rating: 0,
      reviewCount: 0,
      coordinate: [88.46333859284563, 22.485003979610042],
      isFeatured: false,
    },
    {
      id: '1b915a2f-8cf0-80a5-8cdd-ea6e35c8e264',
      name: 'Piyali Deb',
      rating: 0,
      reviewCount: 0,
      coordinate: [88.49222741533691, 22.429955783103114],
      isFeatured: false,
    },
    {
      id: '1b915a2f-8cf0-80c5-af69-d197e390773e',
      name: 'Rumeo Saha',
      rating: 0,
      reviewCount: 0,
      coordinate: [88.47074626764666, 22.480407448555802],
      isFeatured: false,
    },
  ]

  await typesense.collections('models').delete()

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
