import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "News Dikhao - Latest News & Updates",
  description: "Stay updated with the latest news and current affairs from around the world.",
  openGraph: {
    title: "News Dikhao - Latest News & Updates",
    description: "Stay updated with the latest news and current affairs from around the world.",
    url: "https://your-domain.com",
    siteName: "News Dikhao",
    images: [
      {
        url: "https://res.cloudinary.com/divmafjmq/image/upload/v1750128275/newsdikhao_posts/uglrpjygru2op6xgmwba.jpg",
        width: 1200,
        height: 630,
        alt: "News Dikhao",
      },
    ],
    locale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News Dikhao - Latest News & Updates",
    description: "Stay updated with the latest news and current affairs from around the world.",
    images: ["https://res.cloudinary.com/divmafjmq/image/upload/v1750128275/newsdikhao_posts/uglrpjygru2op6xgmwba.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="monetag" content="8eac6cc11633ba631dc6516ab651e8bb" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
