export interface BlogThumbnail {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

export interface BlogContent extends BlogThumbnail {
  content: string;
  video: string;
}
