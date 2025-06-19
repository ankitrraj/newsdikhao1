"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Zap, Circle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { NewsItem } from "@/lib/types"

interface BreakingNewsTickerProps {
  news: NewsItem[]
}

export default function BreakingNewsTicker({ news }: BreakingNewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (news.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length)
    }, 4000) // 4 seconds per news item

    return () => clearInterval(timer)
  }, [news.length])

  if (news.length === 0) return null

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-2 sm:py-3 overflow-hidden shadow-lg border-b-2 border-red-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {/* Enhanced News Label */}
          <div className="flex items-center bg-red-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg mr-4 sm:mr-6 flex-shrink-0 shadow-lg border border-red-800">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-pulse text-yellow-300" />
            <span className="text-xs sm:text-sm font-bold tracking-wide">
              <span className="sm:hidden">समाचार</span>
              <span className="hidden sm:inline">ताजा समाचार</span>
            </span>
            <div className="ml-2 bg-yellow-400 text-red-900 px-2 py-0.5 rounded-full text-xs font-bold">
              {news.length}
            </div>
          </div>

          {/* News Items Container - Enhanced */}
          <div className="flex-1 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {/* First Loop */}
              {news.map((item, index) => (
                <div key={`first-${item.id}`} className="flex items-center">
                  <Link
                    href={`/news/${item.id}`}
                    className="inline-block hover:text-yellow-200 transition-colors duration-300 px-2"
                  >
                    <div className="flex items-center space-x-2 bg-red-500/40 hover:bg-red-400/50 px-3 sm:px-4 py-1.5 rounded-full border border-red-400/60 transition-all duration-300 backdrop-blur-sm">
                      {/* News Type Badge */}
                      {item.isBreaking ? (
                        <Badge className="bg-yellow-500 text-red-900 px-1.5 py-0.5 text-xs font-bold animate-pulse">
                          🔥
                        </Badge>
                      ) : (
                        <Clock className="h-3 w-3 text-blue-300" />
                      )}

                      {/* News Title */}
                      <span className="text-xs sm:text-sm font-medium">
                        {item.title.length > 80 ? `${item.title.substring(0, 80)}...` : item.title}
                      </span>
                    </div>
                  </Link>

                  {/* Enhanced Separator */}
                  {index < news.length - 1 && (
                    <div className="flex items-center mx-3 sm:mx-4">
                      <Circle className="h-1.5 w-1.5 sm:h-2 sm:w-2 fill-yellow-300 text-yellow-300 animate-pulse" />
                      <div className="w-6 sm:w-10 h-px bg-gradient-to-r from-yellow-300 via-orange-300 to-transparent ml-2"></div>
                      <Circle className="h-1 w-1 fill-orange-300 text-orange-300 animate-pulse ml-2" />
                    </div>
                  )}
                </div>
              ))}

              {/* Second Loop for Continuous Scroll */}
              {news.map((item, index) => (
                <div key={`second-${item.id}`} className="flex items-center ml-6 sm:ml-10">
                  <Link
                    href={`/news/${item.id}`}
                    className="inline-block hover:text-yellow-200 transition-colors duration-300 px-2"
                  >
                    <div className="flex items-center space-x-2 bg-red-500/40 hover:bg-red-400/50 px-3 sm:px-4 py-1.5 rounded-full border border-red-400/60 transition-all duration-300 backdrop-blur-sm">
                      {/* News Type Badge */}
                      {item.isBreaking ? (
                        <Badge className="bg-yellow-500 text-red-900 px-1.5 py-0.5 text-xs font-bold animate-pulse">
                          🔥
                        </Badge>
                      ) : (
                        <Clock className="h-3 w-3 text-blue-300" />
                      )}

                      {/* News Title */}
                      <span className="text-xs sm:text-sm font-medium">
                        {item.title.length > 80 ? `${item.title.substring(0, 80)}...` : item.title}
                      </span>

                      {/* Category Badge */}
                      <Badge className="bg-blue-600/80 text-white px-2 py-0.5 text-xs">{item.category}</Badge>
                    </div>
                  </Link>

                  {/* Enhanced Separator */}
                  {index < news.length - 1 && (
                    <div className="flex items-center mx-3 sm:mx-4">
                      <Circle className="h-1.5 w-1.5 sm:h-2 sm:w-2 fill-yellow-300 text-yellow-300 animate-pulse" />
                      <div className="w-6 sm:w-10 h-px bg-gradient-to-r from-yellow-300 via-orange-300 to-transparent ml-2"></div>
                      <Circle className="h-1 w-1 fill-orange-300 text-orange-300 animate-pulse ml-2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* News Counter */}
          <div className="hidden sm:flex items-center bg-red-900 px-3 py-1.5 rounded-lg ml-4 shadow-lg border border-red-800">
            <span className="text-xs font-medium text-yellow-300">
              {currentIndex + 1}/{news.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
