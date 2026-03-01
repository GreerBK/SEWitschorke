import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

/*
 * Custom fonts: Balgin (display headings) and Sinclaire (body/italic)
 * Upload your .woff2/.ttf/.otf files to /public/fonts/ and update the src paths below.
 * Currently using Playfair Display and Cormorant Garamond as fallback Google Fonts
 * loaded via @font-face in globals.css until the custom files are provided.
 */

export const metadata: Metadata = {
  title: 'SE Witschorke | Author - Foodie - Traveler',
  description: 'SE Witschorke is an author, foodie, and traveler. Explore her books, travel photography, and culinary adventures.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
