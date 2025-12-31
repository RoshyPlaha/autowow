import type { Metadata } from "next";
import localFont from "next/font/local";
import { Merriweather } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import PageTransition from "@/components/page-animation/page-transitions";
import TransitionProvider from "@/components/page-animation/transitions-provider";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
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
  metadataBase: new URL("https://autoro.space/"),
  title: {
    default: "Autoro",
    template: "%s | Autoro",
  },
  description: "Find your next car in seconds",
  twitter: {
    title: "Autoro - automotive website builder",
    card: "summary_large_image",
    images: [
      {
        url: "assets/opengraph.png",
        width: 1200,
        height: 522,
        alt: "Autoro - automotive website builder",
      },
    ],
  },
  openGraph: {
    title: "Autoro - Search your next car",
    description: "All things automotive.",
    url: "https://autoro.space/",
    siteName: "Autoro",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/assets/opengraph.png",
        width: 1200,
        height: 522,
        alt: "Autoro - automotive website builder",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ViewTransitions>
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} ${merriweather.variable} antialiased`}
      >
        <PageTransition />
        <TransitionProvider>{children}</TransitionProvider>
        <Analytics />
      </body>
    </html>
    // </ViewTransitions>
  );
}
