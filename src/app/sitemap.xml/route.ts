import { getAllBlogThumbnails } from "@/lib/get-blogs";
import { BlogThumbnail } from "shared_objects/blog";
export async function GET() {

    const posts = await getAllBlogThumbnails()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://capsules.today</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://capsules.today/pricing</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://capsules.today/account</loc> 
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
      ${posts.map((post: BlogThumbnail) => 
        `<url>
          <loc>https://capsules.today/blog/${post.slug}</loc>
          <lastmod>${new Date(post.date).toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>`).join('')}
    </urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
} 