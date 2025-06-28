import { getCategories } from "@/lib/firebase-utils"
import CategoryTabs from "./category-tabs"
import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next";

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

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Format the category name for display
  const categoryName = params.slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  
  return {
    title: `${categoryName} News - News Dikhao`,
    description: `Latest ${categoryName} news and updates on News Dikhao. Read the most recent ${categoryName.toLowerCase()} headlines, articles, and stories.`,
    keywords: `${categoryName.toLowerCase()} news, ${categoryName.toLowerCase()} updates, हिंदी ${categoryName.toLowerCase()} न्यूज़, News Dikhao`,
    openGraph: {
      title: `${categoryName} News - News Dikhao`,
      description: `Latest ${categoryName} news and updates on News Dikhao.`,
      url: `https://www.newsdikhao.co.in/category/${params.slug}`,
      images: [
        {
          url: "https://www.newsdikhao.co.in/og-default-image.webp",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
