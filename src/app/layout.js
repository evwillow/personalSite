import "./globals.css"
import { cx } from "@/src/utils"
import { Inter, Manrope } from "next/font/google"
import Header from "@/src/components/Header"
import ContentWrapper from "../components/ContentWrapper"
import siteMetadata from "../utils/siteMetaData"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
  preload: true,
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
  preload: true,
})

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  publisher: siteMetadata.author,
  generator: "Next.js",
  applicationName: siteMetadata.title,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        width: 1200,
        height: 630,
        alt: `${siteMetadata.author} - ${siteMetadata.description}`,
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`],
    creator: siteMetadata.twitterHandle,
    site: siteMetadata.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
  verification: {
    google: siteMetadata.googleSiteVerification,
  },
  category: siteMetadata.category,
}

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning={true}
      className="scroll-smooth"
    >
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body
        className={cx(
          inter.variable,
          manrope.variable,
          "font-mr dark:bg-dark min-h-screen flex flex-col relative"
        )}
      >
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-PY3QDKEHPN"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PY3QDKEHPN');
          `}
        </Script>
        <Header />
        <div className="flex-grow">
          <ContentWrapper>
            {children}
          </ContentWrapper>
        </div>
      </body>
    </html>
  )
}
