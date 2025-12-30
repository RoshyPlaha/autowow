import Image from "next/image";

interface BlogMainImageProps {
  src: string;
  alt?: string;
}

export default function BlogMainImage({ src, alt = "Blog main image" }: BlogMainImageProps) {
  return (
    <div className="w-full max-w-4xl mx-auto my-8 rounded-2xl overflow-hidden shadow-lg">
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </div>
  );
}
