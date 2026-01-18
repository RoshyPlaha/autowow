import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/pricing", "/account"]

            }
        ],
        sitemap: "https://autoro.space/sitemap.xml",
    }
}