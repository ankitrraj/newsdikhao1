import Image from "next/image"
import Link from "next/link"
import { Clock, Eye, User, Zap, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { NewsItem } from "@/lib/types"

interface NewsCardProps {
  news: NewsItem
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-48">
        <Image
          src={news.imageUrl || "/placeholder.svg?height=200&width=400"}
          alt={news.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {news.isBreaking && (
            <Badge className="bg-red-600 animate-pulse text-white text-xs px-2 py-1">
              <Zap className="h-3 w-3 mr-1" />
              Breaking
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <Link href={`/news/${news.id}`}>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
            {news.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{news.excerpt}</p>

        {news.tags && news.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {news.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Read Button */}
        <Link href={`/news/${news.id}`}>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group">
            पूरा पढ़ें
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0">
        <div className="flex items-center justify-between w-full text-xs text-gray-500">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span className="truncate max-w-20 sm:max-w-none">{news.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span className="sm:hidden">
                {new Date(news.createdAt).toLocaleDateString("hi-IN", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
              <span className="hidden sm:inline">{new Date(news.createdAt).toLocaleDateString("hi-IN")}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-3 w-3" />
            <span>{(news.views || 0) > 1000 ? `${Math.floor((news.views || 0) / 1000)}k` : news.views || 0}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
