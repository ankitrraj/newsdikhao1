"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CategoryPageClient from "./category-page-client"
import type { Category } from "@/lib/types"
import { useEffect, useState } from "react"

interface CategoryTabsProps {
  categories: Category[]
  defaultCategory: Category
}

export default function CategoryTabs({ categories: initialCategories, defaultCategory }: CategoryTabsProps) {
  const [categories, setCategories] = useState(() => {
    // Reorder categories to put active one first
    const activeIndex = initialCategories.findIndex(cat => cat.name === defaultCategory.name)
    if (activeIndex === -1) return initialCategories

    const reordered = [...initialCategories]
    const [activeCategory] = reordered.splice(activeIndex, 1)
    return [activeCategory, ...reordered]
  })

  // Update categories order when tab changes
  const handleTabChange = (newValue: string) => {
    console.log("Tab changed to category name:", newValue)
    const activeIndex = categories.findIndex(cat => cat.name === newValue)
    if (activeIndex <= 0) return // Already first or not found

    const reordered = [...categories]
    const [activeCategory] = reordered.splice(activeIndex, 1)
    setCategories([activeCategory, ...reordered])
  }

  // Function to update a category's post count
  const updateCategoryPostCount = (categoryId: string, newCount: number) => {
    setCategories(prevCategories => 
      prevCategories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, postCount: newCount }
          : cat
      )
    )
  }

  useEffect(() => {
    console.log("CategoryTabs mounted with categories:", categories.map(c => c.name))
    console.log("Default category:", defaultCategory.name)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md">
      <Tabs defaultValue={defaultCategory.name} className="w-full" onValueChange={handleTabChange}>
        <div className="border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="max-w-full overflow-x-auto scrollbar-hide">
            <TabsList className="h-auto inline-flex w-auto min-w-full p-1 gap-1">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.slug} 
                  value={category.name}
                  className="px-6 py-3 text-base font-medium whitespace-nowrap rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-gray-100 transition-all"
                >
                  {category.name}
                  <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {category.postCount || 0}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
        
        <div className="mt-4 p-4">
          {categories.map((category, index) => {
            const nextCategory = categories[(index + 1) % categories.length]
            const prevCategory = categories[(index - 1 + categories.length) % categories.length]

            return (
              <TabsContent 
                key={category.slug} 
                value={category.name}
              >
                <CategoryPageClient 
                  category={category}
                  onPostCountUpdate={(newCount) => updateCategoryPostCount(category.id, newCount)}
                  onNextCategory={() => {
                    console.log("Navigating to next category:", nextCategory.name)
                    const tabsList = document.querySelector('[role="tablist"]')
                    const nextTab = tabsList?.querySelector(`[data-value="${nextCategory.name}"]`) as HTMLButtonElement
                    nextTab?.click()
                  }}
                  onPrevCategory={() => {
                    console.log("Navigating to previous category:", prevCategory.name)
                    const tabsList = document.querySelector('[role="tablist"]')
                    const prevTab = tabsList?.querySelector(`[data-value="${prevCategory.name}"]`) as HTMLButtonElement
                    prevTab?.click()
                  }}
                />
              </TabsContent>
            )
          })}
        </div>
      </Tabs>
    </div>
  )
} 