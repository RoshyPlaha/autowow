import { BlogContent, BlogThumbnail } from "shared_objects/blog";
import { getBlogContent } from "utils/database";

export async function getAllBlogThumbnails(): Promise<BlogThumbnail[]> {

  

  const posts: BlogThumbnail[] = [
    {
      slug: "what-is-capsule",
      title: "What is Capsule? (coming soon)",
      excerpt: "Learn about the video time capsule platform...",
      date: "2024-12-20",
    },
    {
      slug: "new-years-2025",
      title: "Creating New Years 2025 (coming soon)",
      excerpt: "Saving your memories for the new year...",
      date: "2024-12-19",
    },
  ];

  return posts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogContent | null> {
  const posts = await getAllBlogThumbnails();

  const post = posts.find((post) => post.slug === slug);

  if (!post || !post.slug) {
    console.warn(`Post not found for slug: ${slug}`);
    return null;
  }

  try {
    const content = await getBlogContent(post.slug);

    console.log("content is", content.content);
    return {
      ...post,
      content: content.content.toString(),
      video: content.video,
    };

  } catch (error) {
    console.error("Error getting blog content", error);
    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      content: "Oops - no content found",
      video: "",
    };
  }
}
