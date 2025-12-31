import NavigationLink from "@/components/page-animation/transition-link";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/get-blogs";
import { Footer } from "@/components/layout/footer_default";
import Image from "next/image";
import CodeSnippet from "@/components/blog/code-snippet";
import BlogMainImage from "@/components/blog/blog-main-image";
import Nav from "@/components/navigation/navigation";

// Markdown components for rendering
const markdownComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold text-[#1a3266] font-merriweather mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold text-[#1a3266] font-merriweather mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-bold text-[#1a3266] font-merriweather mb-2">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-base md:text-lg text-gray-700 font-merriweather mb-4 leading-relaxed">
      {children}
    </p>
  ),
  a: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href?: string;
  }) => (
    <a
      href={href}
      className="text-[#1a3266] underline hover:text-[#7db3d3] transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 font-merriweather">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 font-merriweather">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="ml-4">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-[#1a3266] pl-4 italic my-4 text-gray-600 font-merriweather">
      {children}
    </blockquote>
  ),
  code: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => {
    // Check if this is a code block (has className with language) or inline code
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : undefined;
    const isInline = !className;

    if (isInline) {
      return (
        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      );
    }

    // For code blocks, use CodeSnippet component
    return (
      <CodeSnippet language={language}>
        {String(children).replace(/\n$/, "")}
      </CodeSnippet>
    );
  },
  img: ({
    src,
    alt,
  }: {
    src?: string;
    alt?: string;
  }) => {
    if (!src) return null;
    
    // Check if this is a main image (alt text contains "main-image" or starts with "main:")
    const isMainImage = alt?.toLowerCase().includes("main-image") || alt?.toLowerCase().startsWith("main:");
    
    if (isMainImage) {
      return <BlogMainImage src={src} alt={alt || "Blog main image"} />;
    }
    
    // Regular images
    return (
      <Image
        src={src}
        alt={alt || ""}
        width={800}
        height={450}
        className="rounded-lg my-4"
      />
    );
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  return {
    title: post?.title || "Blog Post",
    description: post?.excerpt || "",
    twitter: {
      card: "summary_large_image",
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPost({ params }: any) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col font-merriweather bg-white">
        <Nav />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#1a3266] mb-4">
              Post Not Found
            </h1>
            <NavigationLink
              href="/blog"
              className="text-[#1a3266] underline hover:text-[#7db3d3]"
            >
              ← Back to Blog
            </NavigationLink>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-merriweather bg-white">
      <Nav />ƒ
      <div className="flex-1 max-w-4xl mx-auto py-12 px-4 md:px-8 w-full">
        <NavigationLink
          href="/blog"
          className="text-[#1a3266] underline hover:text-[#7db3d3] mb-8 inline-block"
        >
          ← Back to Blog
        </NavigationLink>

        {/* Featured Image */}
        {post.image && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
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
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2 text-[#7db3d3]">
              <span>{post.category}</span>
            </div>
            <time className="text-gray-600">{post.date}</time>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a3266] mb-4">
            {post.title}
          </h1>
        </header>

        {/* Video if present */}
        {post.video && (
          <div className="mb-8">
            <div className="aspect-video">
              <iframe
                src={post.video}
                title="Video player"
                className="w-full h-full rounded-lg"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Markdown Content */}
        {post && (
          <article className="prose prose-lg max-w-none">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <ReactMarkdown components={markdownComponents as any}>
              {post.content}
            </ReactMarkdown>
          </article>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <NavigationLink
            href="/blog"
            className="text-[#1a3266] underline hover:text-[#7db3d3]"
          >
            ← Back to Blog
          </NavigationLink>
        </div>
      </div>
      <Footer />
    </div>
  );
}
