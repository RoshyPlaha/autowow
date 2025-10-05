import { getAllBlogThumbnails } from "@/lib/get-blogs";
import { Metadata } from "next";

import { BlogThumbnail } from "shared_objects/blog";


export async function generateStaticParams() {
  const posts: BlogThumbnail[] = await getAllBlogThumbnails();
  return posts.map((post) => ({ slug: post.slug }));
}


export const metadata: Metadata = {
  title: "Blog",
  twitter: {
    card: "summary_large_image",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-white">{children}</div>;
}
