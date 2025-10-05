import type { Metadata } from "next";
import localFont from "next/font/local";
import { Merriweather } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

const geist = localFont({
  src: [
    {
      path: "../../public/fonts/GeistMonoVF.woff", // Adjust the path based on your file structure
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist",
});

const geistMono = localFont({
  src: [
    {
      path: "../../public/fonts/GeistMonoVF.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://capsules.today'),
  title: {
    default: "capsules.today",
    template: "%s | capsules.today",
  },
  description: "Record with intent. Time. moves. fast. Capsule your moments now.",
  twitter: {
    title: 'Capsules - Your Story Matters',
    card: 'summary_large_image',
    images: [
      {
        url: '/assets/twitter-share.png',
        width: 1200,
        height: 522,
        alt: 'Capsules - Record Future Memories',
      },
    ],
  },
  openGraph: {
    title: 'Capsules - Record Future Memories',
    description: "Record with intent. Time. moves. fast. Capsule your moments now.",
    url: 'https://capsules.today',
    siteName: 'Capsules',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/assets/twitter-share.png',
        width: 1200,
        height: 522,
        alt: 'Capsules - Record Future Memories',
      },
    ],
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} ${merriweather.variable} antialiased`}>
        {children}

        <GoogleTagManager gtmId="G-VW2R6DDC6T" />

        <Toaster />
      </body>
    </html>
  );
}
