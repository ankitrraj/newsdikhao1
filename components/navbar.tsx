"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, X, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getCategories } from "@/lib/firebase-utils"
import type { Category } from "@/lib/types"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories()
      setCategories(fetchedCategories)
    }
    fetchCategories()
  }, [])

  // Show only first 4 categories in desktop navbar, rest in dropdown
  const visibleCategories = categories.slice(0, 4)
  const hiddenCategories = categories.slice(4)

  const handleSearchClick = () => {
    router.push("/search")
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-8 w-8 rounded-lg overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/divmafjmq/image/upload/v1750128275/newsdikhao_posts/uglrpjygru2op6xgmwba.jpg"
                  alt="News Dikhao Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold text-gray-900">News Dikhao</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              होम
            </Link>

            {/* Visible Categories */}
            {visibleCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {category.name}
              </Link>
            ))}

            {/* More Categories Dropdown */}
            {hiddenCategories.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    और श्रेणियाँ
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {hiddenCategories.map((category) => (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link href={`/category/${category.slug}`} className="w-full cursor-pointer">
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Search Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSearchClick}
              className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
            >
              <Search className="h-4 w-4" />
              <span>खोजें</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handleSearchClick}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t max-h-96 overflow-y-auto">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                होम
              </Link>

              <button
                onClick={() => {
                  handleSearchClick()
                  setIsOpen(false)
                }}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                🔍 खोजें
              </button>

              {/* All Categories in Mobile */}
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                  {category.postCount > 0 && <span className="ml-2 text-xs text-gray-500">({category.postCount})</span>}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
