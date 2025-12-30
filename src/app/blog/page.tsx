import { Footer } from "@/components/layout/footer_default";
import { Header } from "@/components/layout/header_default";
import { getAllBlogThumbnails } from "@/lib/get-blogs";
import BlogMainImage from "@/components/blog/blog-main-image";
import Link from "next/link";

const COMPANY_NAME = "AR";
const primaryColor = "#09293c";

export default async function BlogIndex() {
  const posts = await getAllBlogThumbnails();

  return (
    <div className="min-h-screen flex flex-col font-merriweather bg-white">
      <Header brandName={COMPANY_NAME} primaryColor={primaryColor} />
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a3266] mb-12 font-merriweather">
          Blog
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {/* Image Container with Date Banner */}
                <div className="relative w-full h-64 md:h-80 overflow-hidden">
                  {post.image && (
                    <BlogMainImage
                      src={post.image}
                    />
                  )}
                  {/* Date Banner - Overlapping top-right */}
                  <div className="absolute top-4 right-4 bg-[#1a3266] text-white px-4 py-2 rounded">
                    <span className="text-sm md:text-base font-merriweather font-medium">
                      {post.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Metadata - Author and Category */}
                  <div className="flex items-center gap-4 mb-4 text-sm md:text-base">
                    <div className="flex items-center gap-2 text-[#7db3d3]">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-merriweather">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#7db3d3]">
                      <span className="font-merriweather">{post.category}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-bold text-[#1a3266] mb-3 font-merriweather leading-tight">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-base md:text-lg text-gray-700 mb-6 font-merriweather leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Read More Button */}
                  <button className="px-6 py-2 border-2 border-[#7db3d3] text-[#1a3266] bg-white rounded hover:bg-[#7db3d3] hover:text-white transition-colors font-merriweather font-medium">
                    Read More
                  </button>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
      <Footer brandName={COMPANY_NAME} primaryColor={primaryColor} />
    </div>
  );
}
