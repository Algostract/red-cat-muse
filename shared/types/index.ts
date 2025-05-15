export interface Model {
  id: string
  name: string
  image?: string
  rating: number
  reviewCount: number
  isFeatured?: boolean
  isFavorite?: boolean
  coordinate: { lat: number; lng: number }
}

/* Server Only */
export const resourceTypes = ['model', 'studio'] as const

export type ResourceType = (typeof resourceTypes)[number]

export type NotionDB = { [K in ResourceType]: string }

type NotionMediaAsset =
  | {
      type: 'file'
      file: {
        url: string
        expiry_time: string
      }
    }
  | {
      type: 'external'
      external: {
        url: string
      }
    }
  | null

export interface NotionModel {
  id: string
  created_time: string
  last_edited_time: string
  cover: NotionMediaAsset
  icon: NotionMediaAsset
  properties: {
    Name: { type: 'title'; title: { plain_text: string }[] }
    Email: { type: 'email'; email: string }
    Phone: { type: 'phone_number'; phone_number: string }
    Instagram: { type: 'url'; url: string }
    Project: { type: 'relation'; relation: string[]; has_more: false }
  }
  url: string
  public_url: null
}
