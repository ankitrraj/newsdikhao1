import Link from "next/link"
import { ArrowRight, Zap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLatestNews, getSliderNews, getBreakingNews } from "@/lib/firebase-utils"
import NewsSlider from "@/components/news-slider"
import NewsCard from "@/components/news-card"
import BreakingNewsTicker from "@/components/breaking-news-ticker"

export default async function HomePage() {
  // Get all data with fallbacks
  const [sliderNews, breakingNews, latestNews, allBreakingNews] = await Promise.allSettled([
    getSliderNews(),
    getBreakingNews(10), // Get more for ticker
    getLatestNews(5), // Only 5 for home page
    getBreakingNews(5), // Get 5 breaking news for the section
  ])

  const sliderData = sliderNews.status === "fulfilled" ? sliderNews.value : []
  const breakingData = breakingNews.status === "fulfilled" ? breakingNews.value : []
  const latestData = latestNews.status === "fulfilled" ? latestNews.value : []
  const breakingNewsData = allBreakingNews.status === "fulfilled" ? allBreakingNews.value : []

  // Combine latest and breaking news for ticker (max 8 items)
  const tickerNews = [
    ...breakingData, // Breaking news first priority
    ...latestData.filter((news) => !breakingData.some((breaking) => breaking.id === news.id)), // Add latest news that aren't already breaking
  ].slice(0, 8) // Limit to 8 items

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Breaking News Ticker */}
      {tickerNews.length > 0 && <BreakingNewsTicker news={tickerNews} />}

      {/* Hero Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sliderData.length > 0 ? <NewsSlider news={sliderData} /> : <NewsSlider news={latestData.slice(0, 5)} />}
      </section>

      {/* Latest News Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">ताजा समाचार</h2>
          </div>
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

        {latestData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {latestData.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">कोई समाचार उपलब्ध नहीं है।</p>
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

        {breakingNewsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {breakingNewsData.map((news) => (
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
    </div>
  )
}
