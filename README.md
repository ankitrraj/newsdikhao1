# News Dikhao

A modern news portal built with Next.js, Firebase, and Tailwind CSS.

## SEO Implementation

This project uses Next.js App Router's built-in metadata API for server-side SEO optimization.

### How SEO is implemented:

1. **Server-side metadata generation**:
   - Each news article page (`app/news/[id]/page.tsx`) uses the `generateMetadata` function to create dynamic meta tags.
   - This ensures search engines receive proper metadata for indexing.

2. **Client-side SEO component**:
   - A `SEO.js` component is available for any additional client-side meta tags if needed.
   - The primary SEO is handled server-side for better performance and indexing.

3. **Metadata includes**:
   - Title: `${news.title} - News Dikhao`
   - Description: Uses excerpt or first 150 characters of content
   - Keywords: Generated from tags, category, and default keywords
   - Open Graph tags: For social media sharing
   - Twitter Card tags: For Twitter sharing
   - Canonical URL: To prevent duplicate content issues

### How to use:

The SEO implementation is automatic for news articles. When a news item is added to Firebase with proper fields (title, content, excerpt, featuredImage, etc.), the metadata will be generated automatically.

## Important files:

- `app/news/[id]/page.tsx` - Server-side metadata generation
- `components/SEO.js` - Client-side SEO component (if needed)
- `lib/types.ts` - Type definitions including NewsItem interface

## Content-Type Headers

The project includes proper Content-Type headers for:
- `/sitemap.xml`: `application/xml`
- `/robots.txt`: `text/plain`

These headers are defined in `public/_headers` for Vercel deployment. 