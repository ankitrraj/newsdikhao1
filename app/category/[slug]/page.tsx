import { getCategories } from "@/lib/firebase-utils"
import CategoryTabs from "./category-tabs"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Get all categories first
  const categories = await getCategories()
  
  // Find the current category
  const currentCategory = categories.find(cat => cat.slug === params.slug)
  
  if (!currentCategory) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <CategoryTabs 
          categories={categories} 
          defaultCategory={currentCategory} 
        />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const { getCategories } = await import("@/lib/firebase-utils")
    const categories = await getCategories()

    return categories.map((category) => ({
      slug: category.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}
