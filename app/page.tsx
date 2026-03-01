import { HeroSection } from "@/components/home/hero-section"
import { LatestWorks } from "@/components/home/latest-works"
import { FeedSection } from "@/components/home/feed-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LatestWorks />
      <FeedSection />
    </>
  )
}
