import type { Metadata } from "next"
import { getNewsById } from "@/lib/firebase-utils"
import NewsPageClient from "./news-page-client"

// Make the page server-side rendered
export const dynamic = "force-dynamic"

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const news = await getNewsById(params.id)
  if (!news) {
    return {
      title: "News Not Found - News Dikhao",
      description: "The requested news article could not be found."
    }
  }

  const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://newsdikhao.co.in"}/news/${news.id}`
  
  return {
    title: `${news.title} - News Dikhao`,
    description: news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      url: fullUrl,
      siteName: "News Dikhao",
      images: [
        {
          url: news.imageUrl || "/placeholder.svg?height=400&width=800",
          width: 800,
          height: 400,
          alt: news.title,
        },
      ],
      locale: "hi_IN",
      type: "article",
      authors: news.author,
      publishedTime: news.createdAt.toISOString(),
      modifiedTime: news.updatedAt.toISOString(),
      section: news.category,
      tags: news.tags,
    },
    twitter: {
      card: "summary_large_image",
      site: "@NewsDikhao",
      creator: `@${news.author}`,
      title: news.title,
      description: news.excerpt,
      images: [news.imageUrl || "/placeholder.svg?height=400&width=800"],
    },
  }
}

// Server Component
export default async function NewsPage({ params }: { params: { id: string } }) {
  const news = await getNewsById(params.id)
  return <NewsPageClient initialNews={news} params={params} />
}
