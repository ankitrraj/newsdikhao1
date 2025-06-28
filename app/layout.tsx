import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "News Dikhao - हिंदी में ब्रेकिंग न्यूज़, मनोरंजन, खेल और राजनीति",
  description: "News Dikhao पर पढ़ें हिंदी में ब्रेकिंग न्यूज़, मनोरंजन, क्रिकेट, राशिफल, और भारत की सबसे ताज़ा खबरें।",
  keywords: "हिंदी न्यूज़, ब्रेकिंग न्यूज़, बॉलीवुड न्यूज़, क्रिकेट न्यूज़, राशिफल, राजनीति, News Dikhao",
  openGraph: {
    title: "News Dikhao - हिंदी में ब्रेकिंग न्यूज़",
    description: "ताज़ा खबरें पढ़ें सिर्फ News Dikhao पर",
    url: "https://www.newsdikhao.co.in",
    images: [
      {
        url: "https://www.newsdikhao.co.in/og-default-image.webp",
        width: 1200,
        height: 630,
      },
    ],
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
        
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9JPCFTNS08"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9JPCFTNS08');
          `}
        </Script>
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
