import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrialCTASection } from '@/components/sections/TrialCTASection'

export default function HomePage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[120px]" aria-hidden />
        <HeroSection />
        <TrialCTASection />
      </PageFrame>
      <Footer />
    </>
  )
}
