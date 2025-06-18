import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  where,
  updateDoc,
  increment,
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"
import type { NewsItem, Category, ContactSettings } from "./types"

export async function getLatestNews(limitCount = 5): Promise<NewsItem[]> {
  try {
    const postsRef = collection(db, "posts")
    const q = query(postsRef, where("status", "==", "published"), orderBy("createdAt", "desc"), limit(limitCount))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as NewsItem[]
  } catch (error) {
    console.error("Error fetching latest news:", error)
    return []
  }
}

export async function getSliderNews(): Promise<NewsItem[]> {
  try {
    const postsRef = collection(db, "posts")
    const q = query(postsRef, where("status", "==", "published"), orderBy("createdAt", "desc"), limit(20))
    const querySnapshot = await getDocs(q)

    const allPosts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as NewsItem[]

    return allPosts.filter((post) => post.addToSlider).slice(0, 5)
  } catch (error) {
    console.error("Error fetching slider news:", error)
    return getLatestNews(5)
  }
}

export async function getBreakingNews(limitCount = 3): Promise<NewsItem[]> {
  try {
    const postsRef = collection(db, "posts")
    const q = query(postsRef, where("status", "==", "published"), orderBy("createdAt", "desc"), limit(50))
    const querySnapshot = await getDocs(q)

    const allPosts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as NewsItem[]

    return allPosts.filter((post) => post.isBreaking).slice(0, limitCount)
  } catch (error) {
    console.error("Error fetching breaking news:", error)
    return []
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const categoriesRef = collection(db, "categories")
    const q = query(categoriesRef, where("isActive", "==", true))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Category[]
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getNewsByCategory(categorySlug: string): Promise<NewsItem[]> {
  try {
    const categories = await getCategories()
    const category = categories.find((cat) => cat.slug === categorySlug)

    if (!category) {
      console.log("Category not found for slug:", categorySlug)
      return []
    }

    console.log("Found category:", {
      name: category.name,
      slug: category.slug,
      id: category.id
    })

    const postsRef = collection(db, "posts")
    const q = query(
      postsRef,
      where("status", "==", "published"),
      where("category", "==", category.name),
      orderBy("createdAt", "desc"),
    )
    const querySnapshot = await getDocs(q)

    console.log(`Found ${querySnapshot.size} posts for category ${category.name}`)
    
    // Log the first few posts if any exist
    if (querySnapshot.size > 0) {
      console.log("Sample posts:", querySnapshot.docs.slice(0, 2).map(doc => ({
        id: doc.id,
        title: doc.data().title,
        category: doc.data().category
      })))
    }

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as NewsItem[]
  } catch (error) {
    console.error("Error fetching news by category:", error)
    return []
  }
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  try {
    const postRef = doc(db, "posts", id)
    const docSnap = await getDoc(postRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      } as NewsItem
    }
    return null
  } catch (error) {
    console.error("Error fetching news by ID:", error)
    return null
  }
}

export async function incrementViewCount(newsId: string): Promise<void> {
  try {
    const postRef = doc(db, "posts", newsId)
    await updateDoc(postRef, {
      views: increment(1),
    })
  } catch (error) {
    console.error("Error incrementing view count:", error)
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categories = await getCategories()
    return categories.find((cat) => cat.slug === slug) || null
  } catch (error) {
    console.error("Error fetching category by slug:", error)
    return null
  }
}

// Contact Settings
export async function getContactSettings(): Promise<ContactSettings | null> {
  try {
    const settingsRef = doc(db, "settings", "contact")
    const docSnap = await getDoc(settingsRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as ContactSettings
    }
    return null
  } catch (error) {
    console.error("Error fetching contact settings:", error)
    return null
  }
}

// Search functionality
export interface SearchFilters {
  query?: string
  category?: string
  tags?: string[]
  dateFrom?: Date
  dateTo?: Date
  sortBy?: "latest" | "oldest" | "mostViewed"
}

export async function searchNews(filters: SearchFilters): Promise<NewsItem[]> {
  try {
    const postsRef = collection(db, "posts")
    let q = query(postsRef, where("status", "==", "published"))

    // Add category filter if specified
    if (filters.category) {
      q = query(q, where("category", "==", filters.category))
    }

    // Add date filters if specified
    if (filters.dateFrom) {
      q = query(q, where("createdAt", ">=", Timestamp.fromDate(filters.dateFrom)))
    }
    if (filters.dateTo) {
      q = query(q, where("createdAt", "<=", Timestamp.fromDate(filters.dateTo)))
    }

    // Add sorting
    switch (filters.sortBy) {
      case "oldest":
        q = query(q, orderBy("createdAt", "asc"))
        break
      case "mostViewed":
        q = query(q, orderBy("views", "desc"))
        break
      default:
        q = query(q, orderBy("createdAt", "desc"))
    }

    const querySnapshot = await getDocs(q)
    let results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as NewsItem[]

    // Client-side filtering for text search and tags
    if (filters.query) {
      const searchTerm = filters.query.toLowerCase()
      results = results.filter(
        (news) =>
          news.title.toLowerCase().includes(searchTerm) ||
          news.content.toLowerCase().includes(searchTerm) ||
          news.excerpt.toLowerCase().includes(searchTerm) ||
          news.author.toLowerCase().includes(searchTerm),
      )
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter((news) =>
        filters.tags!.some((tag) => news.tags?.some((newsTag) => newsTag.toLowerCase().includes(tag.toLowerCase()))),
      )
    }

    return results
  } catch (error) {
    console.error("Error searching news:", error)
    return []
  }
}

export async function getAllTags(): Promise<string[]> {
  try {
    const postsRef = collection(db, "posts")
    const q = query(postsRef, where("status", "==", "published"))
    const querySnapshot = await getDocs(q)

    const allTags = new Set<string>()
    querySnapshot.docs.forEach((doc) => {
      const data = doc.data()
      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag: string) => allTags.add(tag))
      }
    })

    return Array.from(allTags).sort()
  } catch (error) {
    console.error("Error fetching all tags:", error)
    return []
  }
}
