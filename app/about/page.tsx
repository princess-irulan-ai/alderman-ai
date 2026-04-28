import Image from 'next/image'

import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'
import { PaperApp } from '@/components/paper/PaperApp'

export default function AboutPage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[80px] md:h-[120px]" aria-hidden />
        <section className="py-8 md:py-16">
          <div className="flex justify-center">
            <PaperApp width="fit" bodyClassName="">
              <Image
                src="/brand-assets/photography/alex-headshot-full-v1.jpg"
                alt="Alex Alderman"
                width={1200}
                height={1823}
                className="block h-auto w-full md:w-auto md:max-h-[600px]"
                priority
              />
            </PaperApp>
          </div>
        </section>
      </PageFrame>
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'about your instructor — alderman.ai',
}
