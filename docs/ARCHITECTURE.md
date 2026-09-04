# Interactive Birthday Surprise Website � Architecture Documentation

## 1. Project Purpose
The Interactive Birthday Surprise Website is a personalized, mobile-first web experience designed to feel like an intimate digital gift rather than a standard webpage. It guides the recipient through a cinematic, multi-scene interactive story (Intro, Birthday Reveal, Interactive Cake, Floating Balloons, Surprise Messages, Memory Lane, Personal Letter, and Final Celebration).

---

## 2. Technology Stack
* **Framework:** Next.js 15 (App Router, React 19, TypeScript)
* **Styling:** Tailwind CSS with centralized design tokens
* **Animations:** Framer Motion (declarative scene transitions, micro-interactions, accessible reduced-motion support)
* **Icons & Primitives:** Lucide React icons with WCAG 2.5.5 accessible touch targets (minimum 44x44px)
* **Architecture:** Decoupled config-driven state and component rendering

---

## 3. Directory Layout
```text
src/
+-- app/
�   +-- layout.tsx                # HTML shell, viewport metadata, dark theme
�   +-- page.tsx                  # Root entry rendering ExperienceProvider & ExperienceShell
�   +-- globals.css               # Tailwind directives, CSS variables, safe-area utilities
+-- components/
�   +-- animations/
�   �   +-- FadeIn.tsx            # Micro-interaction animation wrapper
�   �   +-- MotionWrapper.tsx     # Reduced-motion aware Framer Motion container
�   �   +-- SceneTransition.tsx   # AnimatePresence-driven scene swapper
�   +-- common/
�   �   +-- Button.tsx            # Accessible, touch-first button component
�   �   +-- Container.tsx         # Mobile-first responsive wrapper (360px -> desktop)
�   �   +-- SafeTouchTarget.tsx   # 44px minimum touch target enforcer
�   +-- layout/
�   �   +-- ExperienceShell.tsx   # Master layout tying header, scenes, and ambient effects
�   �   +-- HeaderControls.tsx    # Sound toggle, scene progress bar, restart action
�   �   +-- SceneContainer.tsx    # Dynamic viewport height (100dvh) safe-area container
�   +-- scenes/
�   �   +-- SceneRegistry.tsx     # Map connecting SceneId to scene component
�   �   +-- placeholders/         # Diagnostic Phase 1 validation harnesses
�   �       +-- IntroScenePlaceholder.tsx
�   �       +-- RevealScenePlaceholder.tsx
�   �       +-- CakeScenePlaceholder.tsx
�   �       +-- BalloonScenePlaceholder.tsx
�   �       +-- MessageScenePlaceholder.tsx
�   �       +-- MemoryScenePlaceholder.tsx
�   �       +-- LetterScenePlaceholder.tsx
�   �       +-- CelebrationScenePlaceholder.tsx
�   +-- ui/
�       +-- Card.tsx              # Glassmorphic card component with design tokens
+-- config/
�   +-- birthday.config.ts        # Centralized personalized configuration instance
�   +-- scenes.config.ts          # Ordered scene sequence & scene metadata
�   +-- theme.config.ts           # Central design tokens (palette, radii, touch targets)
+-- context/
�   +-- ExperienceContext.tsx     # React Context & Reducer for linear navigation & interaction state
+-- hooks/
�   +-- useExperience.ts          # Hook to consume ExperienceContext safely
�   +-- useReducedMotion.ts       # Hook for prefers-reduced-motion media query
+-- lib/
�   +-- animation-variants.ts     # Reusable Framer Motion transitions
�   +-- constants.ts              # App-wide constants & storage keys
�   +-- utils.ts                  # Utility functions (cn, formatters)
+-- types/
�   +-- config.types.ts           # BirthdayConfig, Theme, and media item types
�   +-- experience.types.ts       # ExperienceState and ExperienceAction types
�   +-- scene.types.ts            # SceneId, metadata, and transition types
+-- public/
    +-- assets/
        +-- audio/                # Audio files (music & sound FX)
        +-- images/               # Photos and memory assets
        +-- illustrations/        # Vector badges and icons
```

---

## 4. Scene Architecture
The user experience flows through 8 sequential scenes:

```text
intro -> reveal -> cake -> balloon -> message -> memory -> letter -> celebration
```

* **Scene IDs:** `intro`, `reveal`, `cake`, `balloon`, `message`, `memory`, `letter`, `celebration`
* **Replay Action:** Replay is **not** a scene; it is an action (`REPLAY_EXPERIENCE`) that resets the experience back to scene 1 (`intro`).
* **Scene Registry:** `SceneRegistry.tsx` maps each scene ID to its respective component. In Phase 1, each scene renders a lightweight placeholder harness to validate state and configuration binding. In later phases, these are upgraded to rich interactive scenes without altering the navigation core.

---

## 5. Configuration & Personalization Architecture
All content is completely decoupled from components.
The configuration is typed via `BirthdayConfig` in `src/types/config.types.ts` and defined in `src/config/birthday.config.ts`:

* `recipient`: Name, nickname, relation, birthDate
* `sender`: Name, signature, relationship
* `theme`: Theme preset (`'romantic'`, `'playful'`, `'elegant'`, `'dreamy'`)
* `intro`: Greeting, subheading, badge, CTA text
* `reveal`: Headline, subheadline, highlight quote
* `cake`: Candle count, cake flavor, wish prompt, blow prompt
* `balloons`: Floating items with emojis and secret messages
* `messages`: Heartfelt notes, categories, and interactive questions
* `memories`: Timeline entries with photos and descriptions
* `photos`: Gallery items with captions
* `letter`: Salutation, multi-paragraph text, quote, closing, signature
* `celebration`: Headline, subtitle, confetti colors, replay text
* `audio`: Background music URL, default volume, sound effects toggle

---

## 6. State Architecture
The application uses a typed React Reducer inside `ExperienceContext.tsx`:

### State Properties
* `currentScene: SceneId`
* `currentSceneIndex: number`
* `direction: 'forward' | 'backward'`
* `isMuted: boolean`
* `isMusicPlaying: boolean`
* `completedScenes: Record<SceneId, boolean>`
* `interactionFlags`: Tracking specific scene interactions (`isIntroComplete`, `isCakeInteracted`, `balloonsPoppedCount`, `isLetterOpened`, `isExperienceComplete`)

### Supported Actions
* `NEXT_SCENE`
* `PREVIOUS_SCENE`
* `GO_TO_SCENE` (payload: `SceneId`)
* `COMPLETE_SCENE` (payload: `SceneId`)
* `TOGGLE_SOUND`
* `SET_MUTED` (payload: `boolean`)
* `SET_MUSIC_PLAYING` (payload: `boolean`)
* `SET_INTERACTION_FLAG` (payload: `{ key, value }`)
* `REPLAY_EXPERIENCE`
* `RESET_EXPERIENCE`

---

## 7. Responsive & Accessibility Standards
* **Mobile Viewports:** Verified at 360px, 390px, 430px, 768px, 1024px, 1440px+.
* **Safe-Area Insets:** `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` padding.
* **100dvh Support:** Prevents jumping or clipping on mobile browser address bar hide/reveal.
* **Touch Targets:** Minimum 44x44px touch targets on all clickable elements.
* **Reduced Motion:** Respects `prefers-reduced-motion: reduce` via `useReducedMotion` hook and CSS fallbacks.
* **Zoom Support:** No restriction on viewport scaling.

---

## 8. Phase Roadmap (How Future Phases Integrate)
* **Phase 1:** Technical Foundation, Scene Engine, Personalization Schema, Placeholders (Current)
* **Phase 2:** Visual Design System (Typography, Glassmorphism, Micro-textures, Color Accents)
* **Phase 3:** Landing & Intro Experience (Opening envelope / gift box animation, audio trigger)
* **Phase 4:** Interactive Birthday Experience (Interactive 3D/SVG Cake, Candle blowing, Balloon popping mini-game)
* **Phase 5:** Memories & Personal Letter (Interactive timeline, photo flip-cards, handwritten letter unfolding)
* **Phase 6:** Final Celebration & Polish (Full confetti physics, music sync, celebration card, replay flow)
* **Phase 7:** Personalization Architecture & Customizer (Dynamic config loader, query param overrides, export options)
* **Phase 8:** Testing, Optimization & Deployment (Performance profiling, bundle optimization, asset compression)

---

## 9. Development & Build Commands
```bash
# Development server
npm run dev

# Type check
npm run typecheck

# Linting
npm run lint

# Production build
npm run build

# Start production server
npm run start
```
