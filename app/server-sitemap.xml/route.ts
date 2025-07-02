import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { db } from '@/lib/firebase';
import { NewsItem } from '@/lib/types';

export async function GET() {
  try {
    // Get all news posts from Firestore
    const newsSnapshot = await getDocs(collection(db, 'news'));
    const newsPosts = newsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as NewsItem[];

    // Create XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${newsPosts
        .map(post => {
          const lastMod = post.updatedAt || post.createdAt || new Date().toISOString();
          return `
        <url>
          <loc>https://www.newsdikhao.co.in/news/${post.id}</loc>
          <lastmod>${new Date(lastMod).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
        })
        .join('')}
    </urlset>`;

    // Return XML response
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      },
    });
  } catch (error) {
    console.error('Error generating server sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
} 