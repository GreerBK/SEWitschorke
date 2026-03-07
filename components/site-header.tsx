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
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-6 py-5 md:py-6 text-center">
        {/* Site Title — Sinclaire display font */}
        <Link href="/" className="inline-block group">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground tracking-wide">
            SE Witschorke
          </h1>
          <p className="font-serif italic text-muted-foreground text-xs sm:text-sm mt-1 tracking-widest uppercase">
            Author &middot; Foodie &middot; Traveler
          </p>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden mt-4 text-foreground hover:text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="6" y1="12" x2="18" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>

        {/* Navigation — Balgin sans for clean UI */}
        <nav
          className={`mt-4 ${menuOpen ? "block" : "hidden"} md:block`}
          aria-label="Main navigation"
        >
          <ul className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-10">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative inline-block pb-1 font-sans text-xs md:text-sm tracking-[0.2em] uppercase transition-colors duration-200 hover:text-primary ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-1/2 h-[1.5px] bg-primary transition-all duration-300 ${
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
