import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getNavLinks } from '@/lib/nav'

export const metadata: Metadata = {
  title: 'SE Witschorke | Author · Foodie · Traveler',
  description: 'SE Witschorke is an author, foodie, and traveler. Explore her books, travel photography, and culinary adventures.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navLinks = getNavLinks()

  return (
    <html lang="en">
      <body className="font-serif antialiased">
        <SiteHeader links={navLinks} />
        <main>{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
