// Import required functions from firebase utils
import { getNewsByCategory, getCategoryBySlug } from "@/lib/firebase-utils"
import NewsCard from "@/components/news-card"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params

  console.log("Fetching category for slug:", slug)
  // Get category details first
  const category = await getCategoryBySlug(slug)

  if (!category) {
    console.log("Category not found for slug:", slug)
    notFound()
  }

  console.log("Found category:", {
    name: category.name,
    slug: category.slug,
    isActive: category.isActive
  })

  // Get news for this category
  console.log("Fetching news for category name:", category.name)
  const news = await getNewsByCategory(slug)

  console.log(`Category: ${category.name}, News count: ${news.length}`)
  if (news.length === 0) {
    console.log("No news found. First few posts in category (if any):", news.slice(0, 3))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
          <p className="text-gray-600">
            {category.postCount > 0 ? `${category.postCount} समाचार उपलब्ध` : "इस श्रेणी में समाचार"}
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">कोई समाचार नहीं मिला</h2>
              <p className="text-gray-500 mb-6">"{category.name}" श्रेणी में अभी तक कोई समाचार प्रकाशित नहीं हुआ है।</p>
              <div className="text-sm text-gray-400">
                <p>Debug Info:</p>
                <p>Category Name: {category.name}</p>
                <p>Category Slug: {category.slug}</p>
                <p>Posts Found: {news.length}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {news.length} समाचार मिले "{category.name}" श्रेणी में
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {news.map((newsItem) => (
                <NewsCard key={newsItem.id} news={newsItem} />
              ))}
            </div>
          </>
        )}
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
