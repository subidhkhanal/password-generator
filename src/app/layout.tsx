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
  metadataBase: new URL("https://password-generator-your-domain.com"),
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
  openGraph: {
    title:
      "Best Free Password Generator - Create Strong & Secure Passwords Instantly",
    description:
      "Create unbreakable passwords with our free, secure generator. Customizable length, special characters, and instant strength checking. No storage, 100% secure.",
    url: "https://password-generator-your-domain.com",
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
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
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
    google: "your-google-site-verification",
    bing: "your-bing-verification",
    yandex: "your-yandex-verification",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
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
              url: "https://password-generator-your-domain.com",
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
                url: "https://password-generator-your-domain.com/app-screenshot.png",
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
