/* ============================================================
   KINETIC — Motion presets for Framer Motion
   Import these instead of hand-writing transitions. Consistency
   in physics is what makes an app feel like one object.
   ============================================================ */

export const spring = {
  /** Buttons, tiles, chips. Snappy, barely overshoots. */
  button: { type: 'spring', stiffness: 420, damping: 24, mass: 0.9 },
  /** Sheets, drawers, cards. Has some weight to it. */
  panel: { type: 'spring', stiffness: 260, damping: 26, mass: 1.0 },
  /** Toggles, checkboxes. Near-instant, no visible bounce. */
  toggle: { type: 'spring', stiffness: 700, damping: 34, mass: 0.6 },
  /** Celebrations. Deliberately underdamped — it should wobble. */
  reward: { type: 'spring', stiffness: 300, damping: 14, mass: 1.1 },
} as const;

export const duration = {
  tap: 0.09,
  fast: 0.15,
  base: 0.24,
  slow: 0.36,
  reward: 0.62,
  parade: 1.1,
} as const;

export const ease = {
  pop: [0.34, 1.56, 0.64, 1],
  popBig: [0.22, 1.72, 0.36, 1],
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  snap: [0.4, 0, 0.2, 1],
} as const;

/* ---------------- Variants ---------------- */

export const popIn = {
  hidden: { opacity: 0, scale: 0.86, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: spring.panel },
  exit: { opacity: 0, scale: 0.94, transition: { duration: duration.fast, ease: ease.out } },
};

/** Parent wrapper for staggered lists. Cap children at ~6. */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
};

export const rise = {
  hidden: { y: '110%' },
  show: { y: 0, transition: spring.panel },
  exit: { y: '110%', transition: { duration: duration.base, ease: ease.out } },
};

export const cheer = {
  hidden: { scale: 0.7, rotate: -4, opacity: 0 },
  show: { scale: 1, rotate: 0, opacity: 1, transition: spring.reward },
};

/** Low amplitude, fast decay. A headshake, not an earthquake. */
export const nope = {
  shake: { x: [0, -7, 6, -4, 2, 0], transition: { duration: 0.42, ease: ease.inOut } },
};

/* ---------------- Haptics ----------------
   Fire within ~30ms of the visual or the brain reads them as
   two separate events. Always paired, never alone.
   ---------------------------------------------------------- */

type Beat = 'press' | 'correct' | 'wrong' | 'streak' | 'complete';

const PATTERNS: Record<Beat, number[]> = {
  press: [10],
  correct: [15, 30, 25],
  wrong: [20, 40, 20],
  streak: [12, 20, 12, 20, 30],
  complete: [20, 40, 20, 40, 60],
};

export function haptic(beat: Beat) {
  if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && beat === 'press') return;
  navigator.vibrate(PATTERNS[beat]);
}

/* ---------------- Reduced motion ---------------- */

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Strips travel but keeps opacity feedback. Use when a variant
 * is applied conditionally rather than relying on CSS overrides.
 */
export function safe<T extends object>(variants: T): T {
  if (!prefersReducedMotion()) return variants;
  return Object.fromEntries(
    Object.entries(variants).map(([k, v]) => [
      k,
      typeof v === 'object' && v !== null
        ? { ...v, x: 0, y: 0, scale: 1, rotate: 0, transition: { duration: 0.06 } }
        : v,
    ]),
  ) as T;
}
