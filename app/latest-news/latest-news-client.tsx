"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Clock, Newspaper } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import NewsCard from "@/components/news-card"
import { db } from "@/lib/firebase"
import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore"
import type { NewsItem } from "@/lib/types"

export default function LatestNewsClient() {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const postsRef = collection(db, "posts")
    const q = query(
      postsRef,
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
      limit(50)
    )

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const news = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as NewsItem[]
      setLatestNews(news)
      setLoading(false)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">लोड हो रहा है...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            होम पर वापस
          </Link>

          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">ताजा समाचार</h1>
              <p className="text-gray-600 mt-2">सभी नवीनतम समाचार और अपडेट</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center space-x-3">
              <Newspaper className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">
                कुल <span className="font-semibold text-blue-600">{latestNews.length}</span> समाचार मिले
              </span>
              <span className="text-xs text-gray-500">• नवीनतम से पुराने क्रम में</span>
            </div>
          </div>
        </div>

        {/* News Grid */}
        {latestNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {latestNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">कोई समाचार नहीं मिला</h2>
              <p className="text-gray-500 mb-6">अभी तक कोई समाचार प्रकाशित नहीं हुआ है।</p>
              <Link href="/">
                <Button>होम पर वापस जाएं</Button>
              </Link>
            </div>
          </div>
        )}

        {/* Load More Button (if needed) */}
        {latestNews.length >= 50 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              और समाचार लोड करें
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 