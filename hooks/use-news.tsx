import { useState, useEffect } from "react"
import {
  collection,
  query,
  orderBy,
  limit,
  where,
  onSnapshot,
  QueryConstraint,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { NewsItem } from "@/lib/types"

// Latest News Hook
export function useLatestNews(limitCount = 5) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      console.log("🔍 Fetching latest news...")
      const postsRef = collection(db, "posts")
      const q = query(
        postsRef,
        where("status", "==", "published"),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      )

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const newsData = snapshot.docs.map((doc) => {
            const data = doc.data()
            console.log("📰 News item found:", {
              id: doc.id,
              title: data.title,
              category: data.category,
              categoryName: data.categoryName,
              categorySlug: data.categorySlug
            })
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
            }
          }) as NewsItem[]
          setNews(newsData)
          setLoading(false)
        },
        (error) => {
          console.error("Error fetching latest news:", error)
          setError(error.message)
          setLoading(false)
        }
      )

      return () => unsubscribe()
    } catch (error) {
      console.error("Error in useLatestNews:", error)
      setError(error instanceof Error ? error.message : "Unknown error")
      setLoading(false)
    }
  }, [limitCount])

  return { news, loading, error }
}

// Breaking News Hook
export function useBreakingNews(limitCount = 3) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const postsRef = collection(db, "posts")
      const q = query(
        postsRef,
        where("status", "==", "published"),
        where("isBreaking", "==", true),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      )

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const newsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate() || new Date(),
          })) as NewsItem[]
          setNews(newsData)
          setLoading(false)
        },
        (error) => {
          console.error("Error fetching breaking news:", error)
          setError(error.message)
          setLoading(false)
        }
      )

      return () => unsubscribe()
    } catch (error) {
      console.error("Error in useBreakingNews:", error)
      setError(error instanceof Error ? error.message : "Unknown error")
      setLoading(false)
    }
  }, [limitCount])

  return { news, loading, error }
}

// Category News Hook
export function useCategoryNews(categoryName: string) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!categoryName) {
      setLoading(false)
      return
    }

    try {
      const postsRef = collection(db, "posts")
      const q = query(
        postsRef,
        where("status", "==", "published"),
        where("category", "==", categoryName),
        orderBy("createdAt", "desc")
      )

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const newsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate() || new Date(),
          })) as NewsItem[]
          setNews(newsData)
          setLoading(false)
        },
        (error) => {
          console.error("Error fetching category news:", error)
          setError(error.message)
          setLoading(false)
        }
      )

      return () => unsubscribe()
    } catch (error) {
      console.error("Error in useCategoryNews:", error)
      setError(error instanceof Error ? error.message : "Unknown error")
      setLoading(false)
    }
  }, [categoryName])

  return { news, loading, error }
}

// Slider News Hook
export function useSliderNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!db) return;

    const postsRef = collection(db, "posts")
    const q = query(
      postsRef,
      where("status", "==", "published"),
      where("addToSlider", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        })) as NewsItem[]
        setNews(newsData)
        setLoading(false)
      },
      (error) => {
        console.error("Error fetching slider news:", error)
        setError(error.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return { news, loading, error }
} 