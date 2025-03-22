export interface Board {
  id: string
  name: string
  description: string
  slug: string
}

export const boards: Board[] = [
  {
    id: 'politics',
    name: 'Politics',
    description: 'Discussion about political topics',
    slug: 'politics'
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Tech news and discussions',
    slug: 'technology'
  },
  {
    id: 'general',
    name: 'General',
    description: 'General discussions',
    slug: 'general'
  }
] 