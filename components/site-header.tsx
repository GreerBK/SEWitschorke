"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

type NavLink = {
  href: string
  label: string
}

interface SiteHeaderProps {
  links: NavLink[]
}

export function SiteHeader({ links }: SiteHeaderProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-teal-dark sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-6 pb-5 md:pb-6 pt-[calc(1.25rem+env(safe-area-inset-top,0px))] md:pt-[calc(1.5rem+env(safe-area-inset-top,0px))] text-center">
        {/* Site title + tagline */}
        <Link href="/" className="inline-block group">
          <h1 className="font-author text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight pb-1">
            SE Witschorke
          </h1>
          <p className="font-serif italic text-sage-light text-xs sm:text-sm mt-5 sm:mt-6 tracking-widest uppercase">
            Author &middot; Foodie &middot; Traveler
          </p>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden mt-4 text-white hover:text-sage-light transition-colors"
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
                    className={`relative inline-block pb-1 font-sans text-xs md:text-sm tracking-[0.2em] uppercase transition-colors duration-200 hover:text-sage-light ${
                      isActive ? "text-white" : "text-sage-light"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-1/2 h-[1.5px] bg-sage-light transition-all duration-300 ${
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
