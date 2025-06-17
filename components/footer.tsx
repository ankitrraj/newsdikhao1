"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, Newspaper } from "lucide-react"
import { getContactSettings, getCategories } from "@/lib/firebase-utils"
import type { ContactSettings, Category } from "@/lib/types"

// X (Twitter) Icon Component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export default function Footer() {
  const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contact, cats] = await Promise.all([getContactSettings(), getCategories()])
        setContactSettings(contact)
        setCategories(cats.slice(0, 6)) // Show only first 6 categories
      } catch (error) {
        console.error("Error fetching footer data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-32 mx-auto"></div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="relative h-10 w-10 rounded-lg overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/divmafjmq/image/upload/v1750128275/newsdikhao_posts/uglrpjygru2op6xgmwba.jpg"
                  alt="News Dikhao Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-2xl font-bold text-white">News Dikhao</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              भारत की सबसे तेज़ और विश्वसनीय समाचार वेबसाइट। हम आपको देश और दुनिया की ताजा खबरें, राजनीति, खेल, मनोरंजन और तकनीक की
              जानकारी प्रदान करते हैं।
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Newspaper className="h-4 w-4" />
              <span>24/7 समाचार सेवा</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">त्वरित लिंक</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  होम
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-300 hover:text-white transition-colors text-sm">
                  खोजें
                </Link>
              </li>
              {categories.slice(0, 4).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">श्रेणियाँ</h3>
            <ul className="space-y-2">
              {categories.slice(4, 8).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              {categories.length === 0 && (
                <>
                  <li className="text-gray-300 text-sm">राजनीति</li>
                  <li className="text-gray-300 text-sm">खेल</li>
                  <li className="text-gray-300 text-sm">मनोरंजन</li>
                  <li className="text-gray-300 text-sm">तकनीक</li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">संपर्क जानकारी</h3>
            <div className="space-y-3">
              {contactSettings?.address && (
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{contactSettings.address}</span>
                </div>
              )}

              {contactSettings?.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <a
                    href={`tel:${contactSettings.phone}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {contactSettings.phone}
                  </a>
                </div>
              )}

              {contactSettings?.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <a
                    href={`mailto:${contactSettings.email}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {contactSettings.email}
                  </a>
                </div>
              )}
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-white">हमें फॉलो करें</h4>
              <div className="flex space-x-3">
                {contactSettings?.facebook && (
                  <a
                    href={contactSettings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors"
                  >
                    <Facebook className="h-4 w-4 text-white" />
                  </a>
                )}

                {contactSettings?.twitter && (
                  <a
                    href={contactSettings.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors"
                  >
                    <XIcon className="h-4 w-4 text-white" />
                  </a>
                )}

                {contactSettings?.instagram && (
                  <a
                    href={contactSettings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-2 rounded-full transition-colors"
                  >
                    <Instagram className="h-4 w-4 text-white" />
                  </a>
                )}

                {contactSettings?.youtube && (
                  <a
                    href={contactSettings.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors"
                  >
                    <Youtube className="h-4 w-4 text-white" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} News Dikhao. सभी अधिकार सुरक्षित।
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                गोपनीयता नीति
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                नियम और शर्तें
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                संपर्क करें
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
