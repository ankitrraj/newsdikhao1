"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Clock, Eye, User, ArrowLeft, Zap, Tag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ShareButtons from "@/components/share-buttons"
import SEO from "@/components/SEO"
import { incrementViewCount } from "@/lib/firebase-utils"
import type { NewsItem } from "@/lib/types"

interface NewsPageClientProps {
  initialNews: NewsItem | null
  params: { id: string }
}

export default function NewsPageClient({ initialNews, params }: NewsPageClientProps) {
  const [news, setNews] = useState<NewsItem | null>(initialNews)

  useEffect(() => {
    // Debug logs for image URL
    if (news) {
      console.log("News Data:", {
        id: news.id,
        title: news.title,
        featuredImage: news.featuredImage,
        imageUrl: (news as any).imageUrl // Check if imageUrl exists
      });
    }
    
    // Increment view count
    if (news) {
      incrementViewCount(news.id)
    }
  }, [news])

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">समाचार नहीं मिला</h1>
          <p className="text-gray-600 mb-6">यह समाचार उपलब्ध नहीं है या हटा दिया गया है।</p>
          <Link href="/">
            <Button>होम पर वापस जाएं</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={`${news.title} - News Dikhao`}
        description={news.excerpt || news.content.slice(0, 150)}
        keywords={`न्यूज़, ${news.category || ''}, ब्रेकिंग न्यूज़, News Dikhao`}
        url={`https://www.newsdikhao.co.in/news/${news.id}`}
        image={news.featuredImage}
      />
      <div className="min-h-screen bg-gray-50">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            होम पर वापस
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-4 mb-4 flex-wrap gap-2">
              {news.isBreaking && (
                <Badge className="bg-red-600 animate-pulse text-white px-3 py-1">
                  <Zap className="h-3 w-3 mr-1" />
                  Breaking News
                </Badge>
              )}
              {news.language === "english" && <Badge className="bg-green-600 text-white px-3 py-1">English</Badge>}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight break-words">
              {news.title}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6 break-words">{news.excerpt}</p>

            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6 flex-wrap gap-2">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{news.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{new Date(news.createdAt).toLocaleDateString("hi-IN")}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{(news.views || 0) + 1} views</span>
              </div>
            </div>

            {/* Enhanced Share Buttons with Image Support */}
            <ShareButtons title={news.title} excerpt={news.excerpt} imageUrl={news.featuredImage} url={`/news/${news.id}`} />
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <div className="relative w-full flex justify-center">
              <Image
                src={news.featuredImage || "/placeholder.svg"}
                alt={news.title}
                width={800}
                height={450}
                className="rounded-lg max-w-full h-auto object-contain"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              />
            </div>
          </div>

          {/* Article Content */}
          <div className="mb-8">
            <div className="prose prose-lg max-w-none">
              <div
                className="text-gray-800 leading-relaxed text-base sm:text-lg break-words overflow-wrap-anywhere"
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  hyphens: "auto",
                }}
              >
                {news.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          {news.tags && news.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-blue-600" />
                संबंधित टैग्स:
              </h3>
              <div className="flex flex-wrap gap-2">
                {news.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Article Meta Info */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">समाचार की जानकारी:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">प्रकाशित:</span>
                <span className="text-gray-600">{new Date(news.createdAt).toLocaleDateString("hi-IN")}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">अपडेट:</span>
                <span className="text-gray-600">{new Date(news.updatedAt).toLocaleDateString("hi-IN")}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  )
} 