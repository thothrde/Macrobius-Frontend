import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to analytics domains for performance */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://plausible.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* SEO and Open Graph meta tags */}
        <meta name="description" content="Interactive educational platform for exploring the works of Macrobius - ancient Roman philosopher, featuring 3D visualizations, vocabulary training, and historical simulations." />
        <meta name="keywords" content="Macrobius, Roman philosophy, Latin education, ancient history, interactive learning, 3D visualization, educational platform" />
        <meta name="author" content="Macrobius Educational Platform" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://macrobius.education/" />
        <meta property="og:title" content="Macrobius Educational Platform - Interactive Ancient Roman Learning" />
        <meta property="og:description" content="Explore the works of Macrobius through interactive 3D visualizations, vocabulary training, and historical simulations. A comprehensive educational platform for ancient Roman philosophy and culture." />
        <meta property="og:image" content="https://macrobius.education/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://macrobius.education/" />
        <meta property="twitter:title" content="Macrobius Educational Platform - Interactive Ancient Roman Learning" />
        <meta property="twitter:description" content="Explore the works of Macrobius through interactive 3D visualizations, vocabulary training, and historical simulations." />
        <meta property="twitter:image" content="https://macrobius.education/og-image.jpg" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Macrobius" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}