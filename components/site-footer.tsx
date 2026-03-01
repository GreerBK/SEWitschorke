import siteData from "@/content/site.json"

export function SiteFooter() {
  return (
    <footer className="bg-teal-dark text-primary-foreground py-8 mt-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="font-sans text-sm tracking-wider uppercase">
          {siteData.title}
        </p>
        <p className="font-serif italic text-sage-light text-xs mt-2">
          {siteData.subtitle}
        </p>
        <div className="mt-4 flex items-center justify-center gap-6 text-sage-light text-xs">
          <a href={siteData.substackUrl} className="hover:text-primary-foreground transition-colors" aria-label="Substack">
            Substack
          </a>
          <a href={siteData.instagramUrl} className="hover:text-primary-foreground transition-colors" aria-label="Instagram">
            Instagram
          </a>
          <a href={siteData.twitterUrl} className="hover:text-primary-foreground transition-colors" aria-label="Twitter">
            Twitter
          </a>
        </div>
        <p className="text-sage/60 text-xs mt-6">
          &copy; {new Date().getFullYear()} {siteData.title}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
