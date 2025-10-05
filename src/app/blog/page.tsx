import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getAllBlogThumbnails } from "@/lib/get-blogs";
import Link from "next/link";

// Type for blog post
export default async function BlogIndex() {
  const posts = await getAllBlogThumbnails();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-300 via-orange-100 to-white-200 overflow-hidden">
      <Header />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-6xl font-bold mb-8">Capsule Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="border border-black border-2 border rounded-lg p-6 hover:shadow-lg transition-all 
                bg-gradient-to-br from-yellow-50 via-red-100 to-purple-200"
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="flex flex-col h-full">
                  <div>
                    <h2 className="text-4xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  </div>
                  <time className="text-sm text-gray-800 mt-auto">{post.date}</time>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />  
    </div>
  );
}
