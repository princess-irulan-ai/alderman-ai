'use client'

import { useState, type ReactNode } from 'react'

import { PaperApp } from '@/components/paper/PaperApp'

export type FaqEntry = { q: string; a: ReactNode }

type FaqChatProps = {
  entries: FaqEntry[]
  emptyState?: ReactNode
}

/**
 * Chevron — large purple angle bracket sitting OUTSIDE the paper-app on
 * the left or right side. Breaks 3D out past the paper edge with a sharp
 * drop-shadow. Currently used by FaqChat's prev/next nav.
 */
function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="36"
      height="64"
      viewBox="0 0 36 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="drop-shadow-[2px_3px_0_rgba(0,0,0,0.35)]"
      aria-hidden
    >
      {direction === 'left' ? (
        <path d="M28 8 L10 32 L28 56" />
      ) : (
        <path d="M8 8 L26 32 L8 56" />
      )}
    </svg>
  )
}

export function FaqChat({ entries, emptyState }: FaqChatProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [history, setHistory] = useState<FaqEntry[]>([])
  const [hasNavigated, setHasNavigated] = useState(false)

  const send = () => {
    setHistory((h) => [...h, entries[currentIdx]])
    setCurrentIdx((i) => (i + 1) % entries.length)
  }

  const prev = () => {
    setHasNavigated(true)
    setCurrentIdx((i) => (i - 1 + entries.length) % entries.length)
  }
  const next = () => {
    setHasNavigated(true)
    setCurrentIdx((i) => (i + 1) % entries.length)
  }

  const current = entries[currentIdx]
  const isEmpty = history.length === 0

  return (
    <div className="relative">
      <PaperApp width="wide" bodyClassName="">
        <div
          className={`px-5 py-6 h-[340px] overflow-hidden flex flex-col ${
            isEmpty
              ? 'items-center justify-center'
              : 'justify-center gap-4'
          }`}
        >
          {isEmpty ? (
            <div className="font-display text-[18px] md:text-[22px] leading-snug italic text-ink-faint text-center">
              {emptyState ?? 'tap a question below to begin'}
            </div>
          ) : (
            history.slice(-2).map((entry, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="self-end max-w-[80%] bg-orange/20 text-ink px-4 py-2 rounded-2xl rounded-br-md font-display text-[16px] leading-snug">
                  {entry.q}
                </div>
                <div className="self-start max-w-[90%] text-ink font-display text-[16px] leading-snug">
                  {entry.a}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input row. Background mirrors the chrome topper's opalescent
            105° gradient, hue-swapped from purple→orange so it visually
            bookends the paper-app top + bottom. Pill (with embedded
            send) fills the row. Prev / next chevrons live OUTSIDE the
            paper-app — see siblings below. */}
        <div
          className="border-t border-ink-faint/30 px-8 py-4"
          style={{
            background:
              'linear-gradient(255deg, #EDEAE0 0%, #EDEAE0 28%, #ECE6E0 52%, #E1DAC8 78%, #DBCFB7 100%)',
          }}
        >
          <button
            type="button"
            onClick={send}
            className="w-full bg-paper text-ink rounded-2xl pl-4 pr-14 py-3 text-[15px] leading-tight font-display text-left border border-ink-faint/30 hover:border-purple/60 transition-colors min-h-[80px] flex items-center relative"
          >
            <span className="line-clamp-2 pr-1">{current?.q}</span>
            <span
              aria-hidden
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-ink text-purple rounded-full w-10 h-10 flex items-center justify-center text-[20px] leading-none pointer-events-none"
            >
              ↑
            </span>
          </button>
        </div>
      </PaperApp>

      {/* Prev / next chevrons — anchored OUTSIDE the paper-app edges.
          `bottom-[44px]` lines them up roughly with the input pill;
          `-translate-x-1/2` and `translate-x-1/2` put each chevron's
          center at the paper-app edge so 50% protrudes outside (3D
          break per sketch). */}
      <button
        type="button"
        aria-label="Previous question"
        onClick={prev}
        className={`absolute left-0 -translate-x-[70%] bottom-[20px] z-10 text-purple p-1 hover:opacity-80 transition-opacity ${
          hasNavigated ? '' : 'animate-bracket-blink'
        }`}
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        aria-label="Next question"
        onClick={next}
        className={`absolute right-0 translate-x-[70%] bottom-[20px] z-10 text-purple p-1 hover:opacity-80 transition-opacity ${
          hasNavigated ? '' : 'animate-bracket-blink'
        }`}
      >
        <Chevron direction="right" />
      </button>
    </div>
  )
}
