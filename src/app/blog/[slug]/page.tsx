import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getBlogPostBySlug } from "@/lib/get-blogs";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Metadata } from "next";
import PageNotFound from "@/app/_not-found/page";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any): Promise<Metadata> {

  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  return {
    title: post?.title || "Capsule Blog",
    twitter: {
      card: "summary_large_image",
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPost({ params }: any) {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return <PageNotFound />
  }

  return (
    <div className="max-w-1xl mx-auto py-12 px-4 bg-white">
      <div className="mt-8">
        <Link href="/blog">
          <RainbowButton>← Back to Blog</RainbowButton>
        </Link>
      </div>
      {post.video && (
        <div className="flex justify-center items-center mb-8">
          <div className="aspect-video min-h-[200px] max-h-[400px]">
            <iframe
              src={post.video}
              title="Video player"
              className="w-full h-full"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="bg-white p-4 rounded- max-w-6xl min-w-[30%]">
          <header className="">
            <h1 className="text-4xl text-black bg-gradient-to-br from-gray-300 via-green-100 to-white-200 font-bold mb-2">
              {post.title}
            </h1>
            <time className="text-gray-500">{post.date}</time>
          </header>
        </div>
        <div className="w-1/2 h-px bg-gray-200 my-4" /> {/* Horizontal line */}
        <div className="flex flex-col gap-2 bg-white rounded-lg p-8 max-w-4xl">
          <div>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Link href="/blog">
          <RainbowButton>← Back to Blog</RainbowButton>
        </Link>
      </div>
    </div>
  );
}
