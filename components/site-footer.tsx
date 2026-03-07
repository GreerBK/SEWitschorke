export function SiteFooter() {
  return (
    <footer className="bg-teal-dark text-primary-foreground">
      {/* Gold divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <div className="text-center">
          {/* Logo */}
          <p className="font-display text-2xl md:text-3xl tracking-wide">
            SE Witschorke
          </p>
          <p className="font-serif italic text-sage-light/80 text-xs mt-2 tracking-widest uppercase">
            Author &middot; Foodie &middot; Traveler
          </p>

          {/* Social links */}
          <div className="mt-8 flex items-center justify-center gap-8">
            {[
              { href: "https://substack.com/@sewitschorke/notes", label: "Substack" },
              { href: "https://www.instagram.com/sweetnsavory61", label: "Instagram" },
              { href: "https://www.tiktok.com/@sweetnsavory61", label: "TikTok" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs tracking-[0.15em] uppercase text-sage-light/70 hover:text-primary-foreground transition-colors duration-300"
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Thin rule */}
          <div className="mt-8 mx-auto w-24 h-px bg-sage-light/20" />

          {/* Copyright */}
          <p className="text-sage-light/40 text-xs mt-6 font-serif">
            &copy; {new Date().getFullYear()} SE Witschorke. All rights reserved.
          </p>
          <p className="text-sage-light/30 text-[10px] mt-2 font-serif">
            Powered by{" "}
            <a
              href="https://www.technextdoormn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sage-light/60 transition-colors underline underline-offset-2"
            >
              Tech Next Door
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
