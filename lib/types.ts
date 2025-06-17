export interface NewsItem {
  id: string
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  status: "published" | "draft"
  isBreaking: boolean
  addToSlider: boolean
  imageUrl: string
  createdAt: Date
  updatedAt: Date
  author: string
  views: number
  language: "hindi" | "english"
}

export interface Category {
  id: string
  name: string
  slug: string
  createdAt: Date
  isActive: boolean
  postCount: number
}

export interface ContactSettings {
  id: string
  address: string
  email: string
  phone: string
  facebook: string
  instagram: string
  twitter: string
  youtube: string
}

export interface SearchFilters {
  query?: string
  category?: string
  tags?: string[]
  dateFrom?: Date
  dateTo?: Date
  sortBy?: "latest" | "oldest" | "mostViewed"
}
