import { FloatingNav } from '@/components/chrome/FloatingNav'
import { Footer } from '@/components/chrome/Footer'
import { PageFrame } from '@/components/layout/PageFrame'

export default function ContactPage() {
  return (
    <>
      <FloatingNav />
      <PageFrame>
        <div className="h-[80px] md:h-[120px]" aria-hidden />
        <section className="pb-12 md:pt-8 md:pb-16">
          <h1 className="font-display text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-display-tight text-ide-fg">
            talk to a <span className="text-orange">HUMAN</span>.
          </h1>
          <p className="mt-6 max-w-[680px] font-body text-[16px] md:text-[17px] leading-relaxed text-ide-fg/85">
            in the age of ai, it&apos;s nice to just talk to a person sometimes.
          </p>
        </section>
      </PageFrame>
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'contact — alderman.ai',
}
