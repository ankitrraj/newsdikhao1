import type { Metadata, ResolvingMetadata } from "next"
import { getNewsById } from "@/lib/firebase-utils"
import NewsPageClient from "./news-page-client"

// Make the page server-side rendered
export const dynamic = "force-dynamic"

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate metadata for the page
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch news data
  const news = await getNewsById(params.id);
  
  // Fallback values if news not found
  if (!news) {
    return {
      title: "News Not Found - News Dikhao",
      description: "The requested news article could not be found.",
    };
  }

  // Extract description from excerpt or content
  const description = news.excerpt || news.content?.substring(0, 150) || "Read the latest news on News Dikhao";
  
  // Generate keywords from tags and category
  const keywords = [
    ...(news.tags || []),
    news.category,
    "हिंदी न्यूज़",
    "ब्रेकिंग न्यूज़",
    "News Dikhao"
  ].filter(Boolean).join(", ");

  // Construct metadata from news data
  return {
    title: `${news.title} - News Dikhao`,
    description: description,
    keywords: keywords,
    authors: news.author ? [{ name: news.author }] : undefined,
    category: news.category,
    openGraph: {
      title: news.title,
      description: description,
      url: `https://www.newsdikhao.co.in/news/${params.id}`,
      siteName: "News Dikhao",
      locale: "hi_IN",
      type: "article",
      publishedTime: news.createdAt ? new Date(news.createdAt).toISOString() : undefined,
      modifiedTime: news.updatedAt ? new Date(news.updatedAt).toISOString() : undefined,
      images: [
        {
          url: news.featuredImage || "https://www.newsdikhao.co.in/og-default-image.webp",
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: description,
      images: news.featuredImage ? [news.featuredImage] : undefined,
    },
    alternates: {
      canonical: `https://www.newsdikhao.co.in/news/${params.id}`,
    },
  }
}

// Server Component
export default async function NewsPage({ params }: { params: { id: string } }) {
  const news = await getNewsById(params.id)
  return <NewsPageClient initialNews={news} params={params} />
}
