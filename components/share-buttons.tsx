"use client"

import { Share, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface ShareButtonsProps {
  title: string
  excerpt: string
  imageUrl?: string
  url: string
}

// X (Twitter) Icon Component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// Facebook Icon Component
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

export default function ShareButtons({ title, excerpt, imageUrl, url }: ShareButtonsProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : url
  const shareText = `${title}\n\n${excerpt}`

  const shareOnX = () => {
    const xParams = new URLSearchParams({
      text: `${title}\n\n${excerpt}`,
      url: shareUrl,
      hashtags: "NewsDikhao,समाचार,News",
    })
    const xUrl = `https://twitter.com/intent/tweet?${xParams.toString()}`
    window.open(xUrl, "x-share", "width=626,height=436")
  }

  const shareOnFacebook = () => {
    const fbParams = new URLSearchParams({
      u: shareUrl,
      quote: shareText,
      picture: imageUrl || "",
    })
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?${fbParams.toString()}`
    window.open(fbUrl, "facebook-share", "width=626,height=436")
  }

  const copyToClipboard = async (text: string) => {
    try {
      // Try using the modern clipboard API
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        return true
      }
      
      // Fallback to older execCommand method
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand("copy")
        document.body.removeChild(textArea)
        return true
      } catch (err) {
        document.body.removeChild(textArea)
        return false
      }
    } catch (err) {
      return false
    }
  }

  const openSharePanel = async () => {
    try {
      if (navigator?.share) {
        // If native share is available (mostly on mobile)
        await navigator.share({
          title: title,
          text: excerpt,
          url: shareUrl,
        })
      } else {
        // Try to copy the link
        const copied = await copyToClipboard(shareUrl)
        if (copied) {
          toast({
            description: "लिंक कॉपी किया गया!",
            action: (
              <div className="flex items-center gap-1">
                <Check className="h-4 w-4" />
              </div>
            ),
          })
        } else {
          // If copying fails, show the link
          toast({
            description: "लिंक: " + shareUrl,
            action: (
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  const copied = await copyToClipboard(shareUrl)
                  if (copied) {
                    toast({
                      description: "लिंक कॉपी किया गया!",
                      action: (
                        <div className="flex items-center gap-1">
                          <Check className="h-4 w-4" />
                        </div>
                      ),
                    })
                  }
                }}
              >
                कॉपी करें
              </Button>
            ),
          })
        }
      }
    } catch (error) {
      console.error("Error sharing:", error)
      // Show the link if everything fails
      toast({
        description: "लिंक: " + shareUrl,
      })
    }
  }

  return (
    <div className="flex items-center gap-2 justify-start">
      {/* X (Twitter) Share Button */}
      <Button
        onClick={shareOnX}
        size="icon"
        variant="outline"
        className="rounded-full hover:bg-gray-100"
      >
        <XIcon className="h-4 w-4" />
      </Button>

      {/* Facebook Share Button */}
      <Button
        onClick={shareOnFacebook}
        size="icon"
        variant="outline"
        className="rounded-full hover:bg-blue-50"
      >
        <FacebookIcon className="h-4 w-4 text-blue-600" />
      </Button>

      {/* Copy/Share Button */}
      <Button
        onClick={openSharePanel}
        size="icon"
        variant="outline"
        className="rounded-full hover:bg-gray-100"
      >
        {typeof navigator !== "undefined" && navigator?.share ? (
          <Share className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
