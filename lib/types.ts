export interface NewsItem {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  category: string
  categoryName: string
  status: "draft" | "published" | "archived"
  featuredImage?: string
  imageUrl?: string
  author: string
  authorName: string
  createdAt: Date
  updatedAt: Date
  tags?: string[]
  views?: number
  likes?: number
  shares?: number
  comments?: number
  isBreaking?: boolean
  language?: "hindi" | "english"
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
