# Kinetic

A motion-first, tactile design system for consumer products that people are meant to open every day.

Kinetic exists because most app interfaces are flat panes of information. Kinetic interfaces are made of **objects**: things with sides, weight, and a floor to press against. When you touch something it compresses. When you get something right the screen celebrates harder than you deserve. When you get something wrong nothing scolds you. That imbalance is deliberate and it is the entire product strategy expressed as design.

Rename `--brand` and the type pair and this system fits a finance app, a health tracker, a language tutor, or a kids' game. The physics stay the same.

---

## The ten laws

Every screen produced in this system must satisfy all ten. If a screen breaks one, the screen is wrong, not the law.

**1. Everything tappable has depth, and pressing it collapses that depth.**
A hard offset shadow (`0 4px 0` in the fill's shade colour, zero blur) sits under every button, tile, and card. On press the element translates down by exactly the shadow offset and the shadow goes to zero. Travel distance must equal shadow offset or the object appears to sink through the floor. Never use a soft blurred shadow for an interactive element — blur makes a rectangle float; a hard edge makes an object sit.

**2. Reward is disproportionate to effort.**
A correct tap earns a 620ms multi-channel event: scale pop, colour flood, progress advance, sound, haptic. A small action producing an outsized response is what makes a product feel generous. Budget your animation time here, not on page transitions.

**3. Failure is soft and never final.**
No red modals, no blocking dialogs, no shame copy. A wrong answer gets a 420ms low-amplitude headshake, a warm coral tint (never fire-engine red), the correct answer shown plainly, and an immediate path forward. Error copy states what happened and what to do — it does not apologise and it does not say "oops".

**4. Progress is permanently on screen.**
A bar, ring, or counter is always visible during any multi-step flow. It moves the instant the step completes, not on the next screen. The user should never have to ask how far they've come.

**5. Nothing arrives at once.**
Groups of elements stagger at 55ms intervals, capped at six — past six, the remainder lands together rather than crawling. Sequenced arrival reads as authored; simultaneous arrival reads as a page load.

**6. Everything that enters, overshoots.**
`cubic-bezier(0.34, 1.56, 0.64, 1)` — about 6% past the target, then settles. Things leaving do not overshoot; they exit fast on `cubic-bezier(0.22, 1, 0.36, 1)`. Arrival has personality. Departure has manners.

**7. Motion is transform and opacity only.**
Never animate `width`, `height`, `top`, `left`, or `box-shadow` spread. Progress bars scale on the X axis. Sheets translate. This is not a performance nicety — it's the difference between a system that feels premium on a flagship and one that feels premium on a R2,000 Android handset, which is most of the market.

**8. One loud thing per screen.**
Exactly one filled primary button per view. Everything else is a ghost button (outlined, neutral depth) or a quiet button (no fill, no depth, for "skip" and "cancel"). If two things are shouting, the user hears neither.

**9. Reduced motion removes travel, never feedback.**
Under `prefers-reduced-motion`, transforms, confetti, and looping animations stop. Colour changes, opacity, and press compression stay — a user with vestibular sensitivity still needs to know their tap registered. Never strip feedback in the name of accessibility.

**10. Copy is short, warm, second-person, and sentence case.**
Buttons say what happens: "Start lesson", not "Submit". The verb survives the whole flow — a "Publish" button produces a "Published" toast. No exclamation marks outside genuine celebration moments. No all-caps labels anywhere.

---

## Foundations

### Colour

Every interactive colour is a **triple**, and using a fill without its shade is a bug:

| Role | Fill | Shade (depth) | Tint (wash) | Deep (text on tint) | On (text on fill) |
|---|---|---|---|---|---|
| Brand / primary | `#7C4DFF` | `#5A2ED4` | `#EFE8FF` | `#4C25B8` | `#FFFFFF` |
| Success | `#2DC653` | `#1E9E3E` | `#E0F8E7` | `#0F6E32` | `#16161D` |
| Error | `#FF4D5E` | `#D62F40` | `#FFE6E9` | `#A81E2D` | `#16161D` |
| Streak | `#FF9F1C` | `#DB7C00` | `#FFF1DB` | `#7A4200` | `#16161D` |
| Info | `#22B8F5` | `#0D91CC` | `#E0F5FE` | `#07607F` | `#16161D` |

Every pair above is audited at ≥4.5:1. Only the brand violet carries white text; the other four carry ink. Dark type on candy-bright fills is the look, and it is also the only version of this palette that passes — white on a vivid green sits at 2.25:1 and is the single most common accessibility failure in playful design systems.

`--x-shade` is for shadows only. Never put text on it. `--x-deep` is the text colour, and it is deliberately darker than the shade.

Neutrals run `#16161D` → `#3C3C47` → `#7B7B8B` → `#E3E3EC` → `#F5F5FA` → `#FFFFFF`.

The error colour is a coral, not a true red. Coral reads as "not quite" — true red reads as "danger", which is wrong for a mistake in a lesson, a mistyped amount, or a failed sync.

Rebranding means changing five `--brand*` lines in `tokens.css`. Nothing else.

### Type

Two families, both round-terminaled and heavy. The roundness of the letterforms is doing the same job as the border radius — it is not decoration, it is consistency.

- **Fredoka** (500–700) — headings, buttons, numbers, anything with personality. Set at `-0.02em` tracking.
- **Nunito** (600–800) — body, labels, long-form. Never below 600 weight; thin text looks fragile against chunky geometry.

Scale: 44 / 32 / 24 / 20 / 18 / 16 / 14. Big jumps, few steps. Body lines cap at 62 characters.

Numbers that change use `font-variant-numeric: tabular-nums`, always. A score that reflows while counting up destroys the illusion of a physical counter.

### Shape

Radii: 8 (chips) / 14 (inputs) / 16 (buttons) / 20 (tiles) / 28 (cards, sheets) / pill. Nothing has a sharp corner except the interior of a progress track.

Borders are 2px and visible. Outlines are structure. A borderless card floating on a tinted background is the flat-design default this system is explicitly not.

### Touch

48px minimum for any target, 56px for primary actions. Padding is generous — `var(--s-5)` and up inside cards. Chunky products need chunky gaps; cramming is the fastest way to lose the feel.

---

## Motion reference

| Token | Duration | Use |
|---|---|---|
| `--t-tap` | 90ms | press-down, toggle |
| `--t-fast` | 150ms | hover, tint, icon swap |
| `--t-base` | 240ms | enter, exit, expand |
| `--t-slow` | 360ms | sheets, page transitions |
| `--t-reward` | 620ms | correct answer, level up |
| `--t-parade` | 1100ms | confetti, full-screen celebration |

| Curve | Value | Use |
|---|---|---|
| `--ease-pop` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | anything entering on user command |
| `--ease-pop-big` | `cubic-bezier(0.22, 1.72, 0.36, 1)` | rewards only |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | exits, dismissals |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | A→B movement |
| `--ease-snap` | `cubic-bezier(0.4, 0, 0.2, 1)` | progress fills, press |

For JS-driven springs (Framer Motion / React Spring), use real physics rather than approximating these curves:

```ts
button:  { type: 'spring', stiffness: 420, damping: 24, mass: 0.9 }
panel:   { type: 'spring', stiffness: 260, damping: 26, mass: 1.0 }
toggle:  { type: 'spring', stiffness: 700, damping: 34, mass: 0.6 }
reward:  { type: 'spring', stiffness: 300, damping: 14, mass: 1.1 }  // deliberately underdamped
```

Named animations: `k-pop-in`, `k-pop-out`, `k-cheer`, `k-nope`, `k-breathe`, `k-flicker`, `k-rise`, `k-draw`, `k-sheen`, `k-confetti`, `k-tick`. Definitions in `motion.css`.

---

## Multi-channel feedback

Visual motion alone is half the effect. Every significant moment fires on three channels simultaneously — they must be within ~30ms of each other or the brain reads them as separate events.

| Moment | Visual | Haptic | Sound |
|---|---|---|---|
| Press | depth collapse, 90ms | light impact (10ms) | none |
| Correct | `k-cheer` + green flood + progress advance | success notification | short rising two-note |
| Wrong | `k-nope` + coral tint | warning notification (double 20ms) | soft low thud, never a buzzer |
| Streak extended | `k-flicker` + count tick | medium impact | ascending arpeggio |
| Level complete | confetti + `k-cheer` on badge | success + medium | full 1.2s cue |

Web: `navigator.vibrate([10])` for press, `[20, 40, 20]` for wrong. React Native: `Haptics.impactAsync`. All sound is opt-out and remembers the choice; nothing autoplays on first load.

---

## Components

`components.css` ships: `.k-btn` (primary / success / danger / info / ghost / quiet), `.k-tile` (selectable option with default/selected/correct/wrong states), `.k-card`, `.k-progress`, `.k-stat`, `.k-feedback`, `.k-input`, `.k-empty`, `.k-confetti-layer`.

Two structural conventions worth knowing:

**Depth direction encodes affordance.** Buttons are raised (`box-shadow: 0 4px 0`). Inputs are recessed (`box-shadow: inset 0 2px 0`). Buttons are objects you press; inputs are holes you put things into. Never mix these.

**State lives on `data-*`, not on class soup.** `data-state="correct"` on a tile switches border, background, text and depth colour in one attribute. Makes state machines trivial to wire and impossible to get half-applied.

---

## Illustration

Illustration over photography, always. Flat vector, 2–3px rounded strokes, the palette above, no gradients except a single subtle one inside large shapes. Characters are geometric and simple enough to be redrawn at 24px. Every empty state, every celebration, every error screen gets art — a blank screen with grey text is a failure of nerve.

If a mascot is used it is original to the product, appears at genuine emotional beats only, and never wanders into utility screens like settings or billing.

---

## Ship checklist

Run this against every screen before it's done.

- [ ] Every tappable thing has a hard offset shadow and collapses by exactly that offset
- [ ] Exactly one filled primary button
- [ ] Progress visible without scrolling
- [ ] Groups stagger at 55ms, capped at six
- [ ] Nothing animates width/height/top/left
- [ ] Numbers are tabular
- [ ] All targets ≥48px, primary ≥56px
- [ ] Text passes WCAG AA against its actual background — check tint backgrounds specifically, they're the usual failure
- [ ] Keyboard focus ring visible on every interactive element
- [ ] `prefers-reduced-motion` tested: transforms gone, press feedback intact
- [ ] Error copy names the problem and the fix, apologises for nothing
- [ ] Empty state has art and a button
- [ ] Dark theme tested — shades still darker than fills, depth still reads

---

## Files

```
tokens.css        colour, type, space, radius, depth, dark theme
motion.css        durations, curves, keyframes, stagger, reduced-motion
components.css    buttons, tiles, cards, progress, feedback, inputs
demo.html         single-file working reference — open it in a browser
react/motion.ts   framer-motion variant presets + haptics helper
react/Button.tsx  press-physics button
react/Feedback.tsx correct/wrong bar + confetti burst
```

`demo.html` is the source of truth for how this should feel. Anything produced in this system should feel like it came from the same hand.
