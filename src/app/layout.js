import "./globals.css"
import { cx } from "@/src/utils"
import { Inter, Manrope } from "next/font/google"
import Header from "@/src/components/Header"
import ContentWrapper from "../components/ContentWrapper"
import siteMetadata from "../utils/siteMetaData"
import Script from "next/script"
import PersonSchema from "@/src/components/SEO/PersonSchema"
import Analytics from "@/src/components/Analytics"

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
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
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
    canonical: "./",
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="msapplication-TileColor" content="#0068ff" />

      </head>
      <body
        className={cx(
          inter.variable,
          manrope.variable,
          "font-mr dark:bg-dark min-h-screen flex flex-col relative"
        )}
      >
        <PersonSchema />
        <Analytics />
        {/* gtag is third-party and costs ~1.4 s of main-thread time on mobile; load it after the page is idle.
            The inline stub below queues events on dataLayer, so none are lost before it arrives. */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PY3QDKEHPN');
            window.addEventListener('load', function () {
              (window.requestIdleCallback || function (f) { setTimeout(f, 3000) })(function () {
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=G-PY3QDKEHPN';
                document.head.appendChild(s);
              }, { timeout: 5000 });
            });
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
