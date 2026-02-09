# Portfolio Overhaul — Impactful Changes

## 1. Hero Section — Name Overlap & Hover Interaction
- [ ] **1a.** Hide "Vonshlovens" completely by default — it should not be visible at all in the resting state
- [ ] **1b.** Show "Eric Evans" as the default displayed name (clean, no overlap)
- [ ] **1c.** On hover, animate the name transition from "Eric Evans" → "Vonshlovens" (smooth text morph/swap, not a mask reveal)
- [ ] **1d.** On hover, reveal a clickable link to vonshlovens.com alongside the name
- [ ] **1e.** Remove the current radial-mask reveal system that causes the overlap

## 2. Hero Stat Cards & Terminal Window
- [ ] **2a.** Remove the "Status: Production" stat card
- [ ] **2b.** Remove the "Tier: Intermediate" stat card
- [ ] **2c.** Move Repos and Commits data into the terminal stats panel (right column)
- [ ] **2d.** Restyle terminal window to match stitch2.html — add background image with overlay, `bg-[#111]` header, `bash — session_active` title, grayscale contrast style
- [ ] **2e.** Add the `> fetch user_stats --detailed` prompt style and bordered rows from stitch2.html
- [ ] **2f.** Add the `_ [Awaiting input...]` footer with blinking cursor from stitch2.html

## 3. Engineering Log — Full Redesign
- [ ] **3a.** Remove the card-stack scroll animation entirely (it's broken and takes forever to scroll through)
- [ ] **3b.** Replace with a layout where all projects are visible at once (bento grid, card gallery, or carousel)
- [ ] **3c.** Each project should be a clickable card that expands or navigates to detail
- [ ] **3d.** Add placeholder image containers (actual image assets needed from owner)
- [ ] **3e.** Preserve project data: displayName, problem, learnings, techStack, category

## 4. Page Centering & Layout
- [ ] **4a.** Audit all sections for consistent centering — the whole page currently hugs the left
- [ ] **4b.** Ensure `max-w-*` + `mx-auto` is applied uniformly across all sections
- [ ] **4c.** Verify responsive behavior at all breakpoints (sm, md, lg, xl)

## 5. Section Styling & Visual Separation
- [ ] **5a.** Add visual dividers/spacing between major sections (Hero → SkillRadar → Engineering Log → etc.)
- [ ] **5b.** Increase vertical padding/margins between sections
- [ ] **5c.** Improve typography — text sizes, weights, line heights, letter spacing feel flat
- [ ] **5d.** Add subtle background variation or accent elements to break up the monotony (alternating section backgrounds, gradient dividers, etc.)
- [ ] **5e.** Review and improve overall color contrast and visual hierarchy

## 6. Card Aesthetics — Work Experience, Education, Interests
- [ ] **6a.** Redesign Work Experience cards — better borders, hover states, visual hierarchy
- [ ] **6b.** Redesign Education cards — improve layout and visual treatment
- [ ] **6c.** Redesign Interest cards — more visually engaging, better icon treatment
- [ ] **6d.** Add consistent spacing/gaps between all cards across sections
- [ ] **6e.** Ensure card styles are cohesive across all three sections
