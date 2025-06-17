"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import NewsCard from "@/components/news-card"
import { searchNews, getAllTags, getCategories } from "@/lib/firebase-utils"
import type { NewsItem, Category, SearchFilters } from "@/lib/types"

// Custom hook for debounced search
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [allTags, setAllTags] = useState<string[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>("latest")
  const [dateFrom, setDateFrom] = useState<string>("")
  const [dateTo, setDateTo] = useState<string>("")

  const searchParams = useSearchParams()
  const router = useRouter()

  // Debounce search query for real-time search
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  useEffect(() => {
    const fetchInitialData = async () => {
      const [tagsData, categoriesData] = await Promise.all([getAllTags(), getCategories()])
      setAllTags(tagsData)
      setCategories(categoriesData)
    }
    fetchInitialData()

    // Get initial search query from URL
    const initialQuery = searchParams.get("q") || ""
    if (initialQuery) {
      setSearchQuery(initialQuery)
      setHasSearched(true)
    }
  }, [searchParams])

  // Real-time search effect
  useEffect(() => {
    if (debouncedSearchQuery.trim() || hasSearched) {
      handleSearch(debouncedSearchQuery)
    }
  }, [debouncedSearchQuery, selectedCategory, selectedTags, sortBy, dateFrom, dateTo])

  const handleSearch = useCallback(
    async (query?: string) => {
      const searchTerm = query !== undefined ? query : searchQuery

      // Don't search if query is empty and no filters are applied
      if (!searchTerm.trim() && !selectedCategory && selectedTags.length === 0 && !dateFrom && !dateTo) {
        setResults([])
        return
      }

      setLoading(true)

      const filters: SearchFilters = {
        query: searchTerm || undefined,
        category: selectedCategory || undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        sortBy: sortBy as "latest" | "oldest" | "mostViewed",
        dateFrom: dateFrom ? new Date(dateFrom) : undefined,
        dateTo: dateTo ? new Date(dateTo) : undefined,
      }

      try {
        const searchResults = await searchNews(filters)
        setResults(searchResults)
        setHasSearched(true)
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
      } finally {
        setLoading(false)
      }
    },
    [searchQuery, selectedCategory, selectedTags, sortBy, dateFrom, dateTo],
  )

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSelectedCategory("")
    setSelectedTags([])
    setSortBy("latest")
    setDateFrom("")
    setDateTo("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    // Update URL with search query
    const params = new URLSearchParams()
    if (value.trim()) {
      params.set("q", value)
      router.push(`/search?${params.toString()}`, { scroll: false })
    } else {
      router.push("/search", { scroll: false })
    }
  }

  // Show popular tags when no search is performed
  const popularTags = useMemo(() => allTags.slice(0, 10), [allTags])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedCategory) count++
    if (selectedTags.length > 0) count += selectedTags.length
    if (dateFrom) count++
    if (dateTo) count++
    return count
  }, [selectedCategory, selectedTags, dateFrom, dateTo])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">समाचार खोजें</h1>

          {/* Search Form */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="समाचार, शीर्षक, या कीवर्ड खोजें... (टाइप करते ही परिणाम दिखेंगे)"
                value={searchQuery}
                onChange={handleInputChange}
                className="pl-10 h-12 text-lg"
                autoFocus
              />
              {loading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              <Filter className="h-4 w-4 mr-2" />
              फिल्टर
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Popular Tags (shown when no search) */}
          {!hasSearched && !loading && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">लोकप्रिय टैग्स:</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    onClick={() => {
                      setSearchQuery(tag)
                      setHasSearched(true)
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>फिल्टर</span>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-1" />
                      साफ़ करें
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">श्रेणी</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="श्रेणी चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">सभी श्रेणियाँ</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">क्रमबद्ध करें</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">नवीनतम पहले</SelectItem>
                      <SelectItem value="oldest">पुराने पहले</SelectItem>
                      <SelectItem value="mostViewed">सबसे ज्यादा देखे गए</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">दिनांक सीमा</label>
                  <div className="space-y-2">
                    <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} placeholder="से" />
                    <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} placeholder="तक" />
                  </div>
                </div>

                {/* Tags Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">टैग्स ({selectedTags.length} चुने गए)</label>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {allTags.slice(0, 30).map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={tag}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagToggle(tag)}
                        />
                        <label htmlFor={tag} className="text-sm cursor-pointer flex-1 truncate">
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            {(selectedCategory || selectedTags.length > 0 || dateFrom || dateTo) && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">सक्रिय फिल्टर:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      श्रेणी: {selectedCategory}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("")} />
                    </Badge>
                  )}
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleTagToggle(tag)} />
                    </Badge>
                  ))}
                  {dateFrom && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      से: {dateFrom}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setDateFrom("")} />
                    </Badge>
                  )}
                  {dateTo && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      तक: {dateTo}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setDateTo("")} />
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Results Count */}
            {hasSearched && (
              <div className="mb-6">
                <p className="text-gray-600">
                  {loading ? "खोज रहे हैं..." : `${results.length} परिणाम मिले`}
                  {searchQuery && ` "${searchQuery}" के लिए`}
                </p>
              </div>
            )}

            {/* Welcome Message */}
            {!hasSearched && !loading && (
              <div className="text-center py-12">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <Search className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">समाचार खोजना शुरू करें</h2>
                  <p className="text-gray-500 mb-6">ऊपर search box में टाइप करना शुरू करें। आपको तुरंत परिणाम दिखाई देंगे।</p>
                  <p className="text-sm text-gray-400">आप शीर्षक, सामग्री, या किसी भी कीवर्ड से खोज सकते हैं।</p>
                </div>
              </div>
            )}

            {/* Results Grid */}
            {loading && hasSearched ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                    <div className="bg-white p-4 rounded-b-lg">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : hasSearched && results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            ) : hasSearched && results.length === 0 && !loading ? (
              <div className="text-center py-12">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">कोई परिणाम नहीं मिला</h2>
                  <p className="text-gray-500 mb-6">
                    "{searchQuery}" के लिए कोई समाचार नहीं मिला। कृपया अलग कीवर्ड का प्रयास करें।
                  </p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>सुझाव:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>अलग कीवर्ड का प्रयास करें</li>
                      <li>कम शब्दों का उपयोग करें</li>
                      <li>फिल्टर हटाने का प्रयास करें</li>
                    </ul>
                  </div>
                  {activeFiltersCount > 0 && (
                    <Button onClick={clearFilters} className="mt-4">
                      सभी फिल्टर साफ़ करें
                    </Button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
