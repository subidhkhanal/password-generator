import "./globals.css";
import type { Metadata } from "next";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default:
      "Best Free Password Generator - Create Strong & Secure Passwords Instantly",
    template: "%s | Modern Password Generator",
  },
  description:
    "Create unbreakable passwords with our free, secure password generator. Features include customizable length (6-32 characters), special characters, numbers, and instant strength checking. No storage, 100% client-side generation.",
  keywords: [
    "password generator",
    "strong password generator",
    "secure password generator",
    "random password generator",
    "free password generator",
    "online password generator",
    "password maker",
    "password creator",
    "secure password",
    "password security tool",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  publisher: "Your Company Name",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title:
      "Best Free Password Generator - Create Strong & Secure Passwords Instantly",
    description:
      "Create unbreakable passwords with our free, secure generator. Customizable length, special characters, and instant strength checking. No storage, 100% secure.",
    url: "http://localhost:3000",
    siteName: "Modern Password Generator",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Modern Password Generator Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Free Password Generator - Create Strong & Secure Passwords",
    description:
      "Create unbreakable passwords instantly. Customizable length, special characters, and strength checking. 100% secure, no storage.",
    creator: "@yourtwitterhandle",
    images: ["/twitter-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: null,
  },
  category: "Security Tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Modern Password Generator",
              applicationCategory: "SecurityApplication",
              operatingSystem: "Any",
              url: "http://localhost:3000",
              description:
                "Create unbreakable passwords with our free, secure password generator. Features customizable length and character types.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Customizable password length (6-32 characters)",
                "Include uppercase and lowercase letters",
                "Include numbers and special characters",
                "Real-time password strength indicator",
                "One-click copy to clipboard",
                "Dark mode support",
                "Mobile-friendly interface",
                "100% client-side generation",
                "No password storage",
              ],
              screenshot: {
                "@type": "ImageObject",
                url: "/app-screenshot.png",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "1250",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
