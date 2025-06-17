"use client"

import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLatestNews, useBreakingNews } from "@/hooks/use-news"
import NewsSlider from "@/components/news-slider"
import NewsCard from "@/components/news-card"
import BreakingNewsTicker from "@/components/breaking-news-ticker"

export default function HomePage() {
  const { news: latestNews, loading: latestLoading } = useLatestNews(10)
  const { news: breakingNews, loading: breakingLoading } = useBreakingNews(5)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breaking News Ticker */}
      {!breakingLoading && breakingNews.length > 0 && (
        <BreakingNewsTicker news={breakingNews.slice(0, 3)} />
      )}

      {/* News Slider */}
      {!breakingLoading && breakingNews.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <NewsSlider news={breakingNews} />
        </div>
      )}

      {/* Latest News Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">ताज़ा खबरें</h2>
          <Link href="/latest-news">
            <Button
              variant="outline"
              className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
            >
              <span>और पढ़ें</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {latestLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {latestNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        )}
      </section>

      {/* Breaking News Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white rounded-lg mx-4 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-2 rounded-full">
              <Zap className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">ब्रेकिंग न्यूज़</h2>
            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">LIVE</div>
          </div>
          <Link href="/breaking-news">
            <Button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white transition-all duration-300">
              <span>और पढ़ें</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {breakingNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {breakingNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8">
              <Zap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">कोई ब्रेकिंग न्यूज़ नहीं</h3>
              <p className="text-gray-500">अभी कोई ब्रेकिंग न्यूज़ उपलब्ध नहीं है।</p>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
