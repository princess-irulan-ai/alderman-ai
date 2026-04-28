import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'

export default function FaqPage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[80px] md:h-[120px]" aria-hidden />
      </PageFrame>
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'faq — alderman.ai',
}
