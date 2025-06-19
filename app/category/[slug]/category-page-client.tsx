"use client"

import { useEffect, useState } from "react"
import NewsCard from "@/components/news-card"
import type { Category, NewsItem } from "@/lib/types"
import { collection, query, where, orderBy, getDocs, doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useSwipe } from "@/hooks/use-swipe"

interface CategoryPageClientProps {
  category: Category
  onNextCategory?: () => void
  onPrevCategory?: () => void
  onPostCountUpdate?: (newCount: number) => void
}

export default function CategoryPageClient({ 
  category, 
  onNextCategory, 
  onPrevCategory,
  onPostCountUpdate 
}: CategoryPageClientProps) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  const { onTouchStart, onTouchMove } = useSwipe({
    onSwipeLeft: onNextCategory,
    onSwipeRight: onPrevCategory,
  })

  useEffect(() => {
    async function fetchNews() {
      try {
        console.log(`🔄 Starting to fetch news for category: ${category.name}`)
        console.log('Category details:', {
          name: category.name,
          slug: category.slug,
          isActive: category.isActive,
          postCount: category.postCount,
          id: category.id
        })

        setLoading(true)
        const postsRef = collection(db, "posts")
        const q = query(
          postsRef,
          where("status", "==", "published"),
          where("category", "==", category.id),
          orderBy("createdAt", "desc")
        )

        console.log('📊 Querying Firestore with filters:', {
          status: 'published',
          categoryId: category.id,
          orderBy: 'createdAt desc'
        })

        const querySnapshot = await getDocs(q)
        console.log(`📥 Received ${querySnapshot.size} documents from Firestore`)

        const newsItems = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          console.log('📄 Document data:', {
            id: doc.id,
            title: data.title,
            category: data.category,
            categoryName: data.categoryName,
            createdAt: data.createdAt?.toDate()
          })
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          }
        }) as NewsItem[]

        // Update category's postCount in Firestore if it's different
        if (category.postCount !== newsItems.length) {
          console.log(`📝 Updating category postCount from ${category.postCount} to ${newsItems.length}`)
          const categoryRef = doc(db, "categories", category.id)
          await updateDoc(categoryRef, {
            postCount: newsItems.length
          })
          
          // Update local category object and notify parent
          category.postCount = newsItems.length
          onPostCountUpdate?.(newsItems.length)
        }

        if (newsItems.length > 0) {
          console.log('📰 First news item:', {
            title: newsItems[0].title,
            category: newsItems[0].category,
            categoryName: newsItems[0].categoryName,
            createdAt: newsItems[0].createdAt
          })
        }

        console.log(`✅ Successfully fetched ${newsItems.length} news items for category: ${category.name}`)
        setNews(newsItems)
      } catch (error) {
        console.error("❌ Error fetching news:", error)
        console.error('Error details:', {
          category: category.name,
          categoryId: category.id,
          errorMessage: error instanceof Error ? error.message : 'Unknown error'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [category.id])

  if (loading) {
    console.log(`⏳ Loading news for category: ${category.name}`)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (news.length === 0) {
    console.log(`ℹ️ No news found for category: ${category.name}`)
    return (
      <div 
        className="text-center py-12"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
          <div className="mb-6">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">कोई समाचार नहीं मिला</h2>
          <p className="text-gray-500">"{category.name}" श्रेणी में अभी तक कोई समाचार प्रकाशित नहीं हुआ है।</p>
          <p className="text-gray-500 mt-2">कृपया बाद में पुनः प्रयास करें।</p>
        </div>
      </div>
    )
  }

  console.log(`📋 Rendering ${news.length} news items for category: ${category.name}`)
  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
        <p className="text-gray-600">
          {news.length} समाचार उपलब्ध
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {news.map((newsItem) => (
          <NewsCard key={newsItem.id} news={newsItem} />
        ))}
      </div>
    </div>
  )
} 