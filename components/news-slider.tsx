"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Clock, Eye, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { NewsItem } from "@/lib/types"

interface NewsSliderProps {
  news: NewsItem[]
}

export default function NewsSlider({ news }: NewsSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (news.length === 0) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % news.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [news.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length)
  }

  if (news.length === 0) {
    return (
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">News Dikhao</h2>
          <p className="text-sm sm:text-lg opacity-90">समाचार लोड हो रहे हैं...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg shadow-lg">
      {news.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className="relative h-full">
            <Image
              src={item.imageUrl || "/placeholder.svg?height=500&width=800"}
              alt={item.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-white">
              <div className="max-w-4xl">
                {/* Breaking News Badge - Only this remains */}
                {item.isBreaking && (
                  <div className="flex items-center mb-2">
                    <Badge className="bg-red-600 text-white px-2 py-0.5 text-xs font-medium animate-pulse rounded-full flex items-center">
                      <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                      <span className="hidden sm:inline">Breaking</span>
                      <span className="sm:hidden">🔥</span>
                    </Badge>
                  </div>
                )}

                {/* Title - Max 2 lines */}
                <Link href={`/news/${item.id}`}>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold hover:text-blue-300 transition-colors cursor-pointer line-clamp-2 leading-tight">
                    {item.title}
                  </h2>
                </Link>

                {/* Read Button - Compact on mobile */}
                <Link href={`/news/${item.id}`} className="mt-3 inline-block">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <span className="sm:hidden">पढ़ें</span>
                    <span className="hidden sm:inline">पूरा पढ़ें</span>
                    <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons - Responsive */}
      {news.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm h-8 w-8 sm:h-10 sm:w-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm h-8 w-8 sm:h-10 sm:w-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>

          {/* Dots Indicator - Smaller on mobile */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
            {news.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
