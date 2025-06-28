import LatestNewsClient from "./latest-news-client"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest News - News Dikhao",
  description: "Stay updated with the latest news and current affairs from India and around the world on News Dikhao.",
  keywords: "latest news, current affairs, ताज़ा खबरें, नवीनतम समाचार, News Dikhao",
  openGraph: {
    title: "Latest News - News Dikhao",
    description: "Stay updated with the latest news and current affairs from India and around the world.",
    url: "https://www.newsdikhao.co.in/latest-news",
    images: [
      {
        url: "https://www.newsdikhao.co.in/og-default-image.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function LatestNewsPage() {
  return <LatestNewsClient />
}
