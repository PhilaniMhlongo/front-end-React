import React, { useEffect, useRef } from 'react';
import { haptic, prefersReducedMotion } from './motion';
import { Button } from './Button';

/* ============================================================
   FeedbackBar — rises from the bottom edge after an answer.
   Colour carries the verdict, copy carries the next step.
   Never blocks the screen. Never needs a dismiss tap.
   ============================================================ */

interface FeedbackProps {
  state: 'correct' | 'wrong';
  /** Shown when wrong. Plain, not scolding. */
  answer?: string;
  onContinue: () => void;
}

export function FeedbackBar({ state, answer, onContinue }: FeedbackProps) {
  const correct = state === 'correct';

  useEffect(() => {
    haptic(correct ? 'correct' : 'wrong');
    if (correct) confettiBurst();
  }, [correct]);

  return (
    <div className={`k-feedback k-feedback--${state}`} role="status" aria-live="polite">
      <Icon correct={correct} />
      <div>
        <div className="k-feedback__title">{correct ? 'Nice' : 'Not quite'}</div>
        {!correct && answer && <div className="k-feedback__note">Answer: {answer}</div>}
      </div>
      <Button variant={correct ? 'success' : 'danger'} onClick={onContinue}>
        Continue
      </Button>
    </div>
  );
}

function Icon({ correct }: { correct: boolean }) {
  return (
    <svg
      className={correct ? 'k-cheer' : 'k-nope'}
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {correct ? (
        <path d="M4 12.5 L9.5 18 L20 6" strokeDasharray="30" strokeDashoffset="30" style={{ animation: 'k-draw 380ms 120ms cubic-bezier(.22,1,.36,1) forwards' }} />
      ) : (
        <>
          <path d="M6 6 L18 18" />
          <path d="M18 6 L6 18" />
        </>
      )}
    </svg>
  );
}

/* ============================================================
   confettiBurst — particles get randomised --dx/--dy/--dr and
   the whole layer removes itself. No library, no canvas, no
   state. Skipped entirely under reduced motion.
   ============================================================ */

const CONFETTI_COLORS = ['var(--brand)', 'var(--green)', 'var(--amber)', 'var(--sky)', 'var(--coral)'];

export function confettiBurst(count = 44) {
  if (prefersReducedMotion()) return;

  const layer = document.createElement('div');
  layer.className = 'k-confetti-layer';

  for (let i = 0; i < count; i++) {
    const p = document.createElement('i');
    const angle = Math.random() * Math.PI * 2;
    const dist = 140 + Math.random() * 320;

    p.style.left = `${45 + Math.random() * 10}%`;
    p.style.top = `${55 + Math.random() * 10}%`;
    p.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--dy', `${Math.sin(angle) * dist + 260}px`); // gravity bias
    p.style.setProperty('--dr', `${Math.random() * 720 - 360}deg`);
    p.style.animationDelay = `${Math.random() * 120}ms`;

    layer.appendChild(p);
  }

  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 1500);
}

/* ============================================================
   Progress — scaleX transform, never width. Stays on the
   compositor so it holds 60fps on low-end hardware.
   ============================================================ */

export function Progress({ value, live = false }: { value: number; live?: boolean }) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div
      className={`k-progress${live ? ' k-progress--live' : ''}`}
      role="progressbar"
      aria-valuenow={Math.round(clamped * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="k-progress__fill" style={{ ['--value' as string]: clamped }}>
        {live && <span className="k-sheen" />}
      </div>
    </div>
  );
}

/* ============================================================
   CountUp — ticks a number with a scale pulse per change.
   Tabular numerals mean it never reflows while counting.
   ============================================================ */

export function CountUp({ value, duration = 600 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const from = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const start = from.current;
    const delta = value - start;
    from.current = value;

    if (prefersReducedMotion() || delta === 0) {
      el.textContent = String(value);
      return;
    }

    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(start + delta * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    el.classList.remove('k-tick');
    void el.offsetWidth; // restart the animation
    el.classList.add('k-tick');

    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <span ref={ref} className="k-num" style={{ display: 'inline-block' }}>0</span>;
}
