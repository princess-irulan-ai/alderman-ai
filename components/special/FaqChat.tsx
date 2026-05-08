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

  const sendByIdx = (idx: number) => {
    setHistory((h) => [...h, entries[idx]])
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

  // Split entries into two columns of 7 for the desktop CTA flanks. Natural
  // reading order (1-7 left, 8-14 right). Total char counts of question
  // strings come out roughly balanced (180 vs 194 chars), so visual column
  // heights stay close.
  const leftCTAs = entries.slice(0, 7)
  const rightCTAs = entries.slice(7)

  return (
    <div className="dev-faq-chat-shell relative">
      {/* DESKTOP-ONLY: left + right CTA columns flanking the chat-app.
          Hidden by default; shown at ≥1200 inside .desktop-experiment.dev-
          faq scope. Each button pushes its question + answer into the
          chat history (same as the input pill's send). At desktop the
          chevrons + input pill are hidden, so these are the only entry
          points to ask a question. */}
      <div className="dev-faq-cta-col dev-faq-cta-left">
        {leftCTAs.map((entry, i) => (
          <FaqQuestionCta key={i} q={entry.q} onClick={() => sendByIdx(i)} />
        ))}
      </div>

      <PaperApp width="wide" bodyClassName="">
        <div
          className={`px-5 py-6 h-[440px] overflow-hidden flex flex-col ${
            isEmpty
              ? 'items-center justify-center'
              : 'justify-end gap-4'
          }`}
        >
          {isEmpty ? (
            <div className="font-display text-[18px] leading-snug italic text-ink-faint text-center">
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
          className="dev-faq-input-pill border-t border-ink-faint/30 px-8 py-4"
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
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-ink text-purple rounded-full w-10 h-10 flex items-center justify-center pointer-events-none"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
                aria-hidden
              >
                <path d="M 12 4 L 20 12 L 15 12 L 15 20 L 9 20 L 9 12 L 4 12 Z" />
              </svg>
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
        className={`dev-faq-chevron absolute left-0 -translate-x-[70%] bottom-[20px] z-10 text-purple p-1 hover:opacity-80 transition-opacity ${
          hasNavigated ? '' : 'animate-bracket-blink'
        }`}
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        aria-label="Next question"
        onClick={next}
        className={`dev-faq-chevron absolute right-0 translate-x-[70%] bottom-[20px] z-10 text-purple p-1 hover:opacity-80 transition-opacity ${
          hasNavigated ? '' : 'animate-bracket-blink'
        }`}
      >
        <Chevron direction="right" />
      </button>

      {/* DESKTOP-ONLY: right CTA column. Mirror of the left column above. */}
      <div className="dev-faq-cta-col dev-faq-cta-right">
        {rightCTAs.map((entry, i) => (
          <FaqQuestionCta
            key={i + 7}
            q={entry.q}
            onClick={() => sendByIdx(i + 7)}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * FaqQuestionCta — purple IDE-style tile button used as the desktop entry
 * point for asking a FAQ question. Mirrors SectionTile's IDE classic shell
 * (rounded-tile + ide-rule border + purple gradient + hover glow) but
 * STRIPS the marker affordance (no walking-cursor `[ >_ ]`, no walking-knob
 * pill) per Alex's "without the radio dial and without the equivalent
 * purple version" spec — the question text itself is the entire tile body.
 * No eyebrow either; just the question.
 */
function FaqQuestionCta({ q, onClick }: { q: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="dev-faq-question-cta block w-full text-left rounded-tile border-2 border-ide-rule px-4 py-3 transition-[box-shadow,border-color] duration-200 hover:border-purple/60 hover:shadow-[0_0_28px_rgba(174,129,255,0.45)] font-mono text-[15px] font-medium text-ide-fg leading-tight"
      style={{
        background:
          'linear-gradient(to top right, rgba(174, 129, 255, 0.45) 0%, rgba(174, 129, 255, 0.18) 25%, transparent 65%)',
      }}
    >
      {q}
    </button>
  )
}
