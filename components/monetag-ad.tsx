"use client"

import { useEffect, useState } from 'react'

interface MonetagAdProps {
  type: 'vignette' | 'interstitial' | 'inpage-push'
  zoneId: string
  className?: string
}

export default function MonetagAd({ type, zoneId, className = '' }: MonetagAdProps) {
  const [showAd, setShowAd] = useState(false)

  useEffect(() => {
    // Add a slight delay before showing ads for better user experience
    const timer = setTimeout(() => {
      setShowAd(true)
    }, 2000) // 2 second delay

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showAd) return

    // Load Monetag script
    const script = document.createElement('script')
    script.src = "https://fpyf8.com/88/tag.min.js"
    script.setAttribute("data-zone", zoneId)
    script.async = true
    script.setAttribute("data-cfasync", "false")
    
    // Prevent any click-triggered behavior
    script.setAttribute("data-popunder", "none")
    script.setAttribute("data-pop-frequency", "none")
    
    // Add the script to head
    document.head.appendChild(script)

    return () => {
      // Cleanup script when component unmounts
      try {
        document.head.removeChild(script)
      } catch (error) {
        console.warn('Error removing Monetag script:', error)
      }
    }
  }, [type, zoneId, showAd])

  // Only render if showAd is true
  if (!showAd) return null

  return (
    <div className={`monetag-ad ${className}`} style={{ position: 'relative', zIndex: 1 }}>
      <div id={`monetag-${type}-${zoneId}`}></div>
    </div>
  )
} 