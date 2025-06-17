import { ArrowLeft, Zap, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import NewsCard from "@/components/news-card"
import { getBreakingNews } from "@/lib/firebase-utils"

export default async function BreakingNewsPage() {
  const breakingNews = await getBreakingNews(50) // Get more breaking news

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
            <div className="bg-red-100 p-3 rounded-full">
              <Zap className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center">
                ब्रेकिंग न्यूज़
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse ml-4">
                  LIVE
                </span>
              </h1>
              <p className="text-gray-600 mt-2">सभी महत्वपूर्ण और तत्काल समाचार</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-sm text-gray-700">
                कुल <span className="font-semibold text-red-600">{breakingNews.length}</span> ब्रेकिंग न्यूज़ मिली
              </span>
              <span className="text-xs text-gray-500">• नवीनतम अपडेट</span>
            </div>
          </div>
        </div>

        {/* Breaking News Grid */}
        {breakingNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {breakingNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <Zap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">कोई ब्रेकिंग न्यूज़ नहीं</h2>
              <p className="text-gray-500 mb-6">अभी कोई ब्रेकिंग न्यूज़ उपलब्ध नहीं है।</p>
              <div className="space-y-4">
                <Link href="/">
                  <Button>होम पर वापस जाएं</Button>
                </Link>
                <div className="text-xs text-gray-400">
                  <p>💡 ब्रेकिंग न्यूज़ के लिए हमारे होम पेज पर नियमित रूप से जाँच करते रहें</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auto Refresh Notice */}
        {breakingNews.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
              <div className="flex items-center space-x-2 text-sm text-yellow-800">
                <div className="animate-pulse w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>यह पेज नवीनतम ब्रेकिंग न्यूज़ के लिए अपडेट होता रहता है</span>
              </div>
            </div>
          </div>
        )}

        {/* Load More Button (if needed) */}
        {breakingNews.length >= 50 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="px-8 bg-red-50 border-red-200 text-red-700 hover:bg-red-100">
              और ब्रेकिंग न्यूज़ लोड करें
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
