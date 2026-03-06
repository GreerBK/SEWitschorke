"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/books", label: "Books" },
    { href: "/gallery", label: "Gallery" },
  ]

  return (
    <header className="bg-background border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-6 text-center">
        {/* Site Title */}
        <Link href="/" className="inline-block">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-[0.15em] sm:tracking-[0.25em] text-foreground uppercase">
            SE Witschorke
          </h1>
          <p className="font-serif italic text-muted-foreground text-sm md:text-base mt-1 tracking-wide">
            Author &ndash; Foodie &ndash; Traveler
          </p>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden mt-4 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        {/* Navigation */}
        <nav
          className={`mt-4 ${menuOpen ? "block" : "hidden"} md:block`}
          aria-label="Main navigation"
        >
          <ul className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative inline-block pb-0.5 text-sm tracking-wider uppercase transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-1/2 h-0.5 bg-primary ${
                        isActive ? "nav-tab-underline" : "w-0 -translate-x-1/2"
                      }`}
                      aria-hidden
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
