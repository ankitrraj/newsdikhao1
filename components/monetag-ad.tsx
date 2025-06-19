"use client"

import { useEffect } from 'react'

interface MonetagAdProps {
  slotId: string
}

export default function MonetagAd({ slotId }: MonetagAdProps) {
  useEffect(() => {
    // Load Monetag script
    const script = document.createElement('script')
    script.src = `https://get.monet-ads.com/pub/${slotId}/tag.min.js`
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup script when component unmounts
      document.head.removeChild(script)
    }
  }, [slotId])

  return (
    <div className="monetag-ad my-4">
      <div id={`container-${slotId}`}></div>
    </div>
  )
} 