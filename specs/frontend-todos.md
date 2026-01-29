# Frontend / Aesthetic TODOs

Visual polish and interaction features, separate from core portfolio content.

---

## TODO List

### 1. Name & Avatar Hover Reveal
- [ ] On the hero section name + profile picture, add a cursor-proximity reveal effect
- [ ] A circular radius around the cursor acts as a "window" that exposes the GitHub identity underneath (username **Vonshlovens** and GitHub profile picture)
- [ ] Outside the radius, the current display name / avatar shows normally; inside the radius, the GitHub version bleeds through

### 2. Card-Stack Scroll Animation
- [ ] Pick one section (work experience, projects, or education) and implement a full-viewport card-stack scroll
- [ ] Each entry fills the screen as a "card"
- [ ] On scroll, the next card slides up over the previous one
- [ ] Previous cards stay fixed in the background (like a deck of playing cards being stacked on top of each other)
- [ ] Once all cards have been viewed, the entire section scrolls away normally

### 3. Disable-Animations Toggle
- [ ] Add a button in the top nav/header that lets users disable all page animations
- [ ] Reference: Affinity product pages have a similar toggle
- [ ] Should persist preference (e.g. localStorage) and respect `prefers-reduced-motion`

### 4. Fix Work Experience Timeline
- [ ] Review and fix the timeline layout in the Work Experience section (alignment, connector lines, spacing)

### 5. Fix Font Colours on Dark Background
- [ ] Review and adjust font colours to ensure proper contrast and readability on the current dark background
- [ ] Verify all text elements are legible and meet accessibility standards

### 6. Add Google Sans Code Font
- [ ] Integrate Google Sans Code font into the project
- [ ] Apply it tastefully to select sections (e.g., code snippets, technical details, or specific headings)
- [ ] Ensure font loading is optimized and doesn't impact performance

### 7. Implement Dark Mode & Light Mode
- [ ] Dark mode: preserve current styling as the dark theme
- [ ] Light mode: use RGB(249, 241, 203) as the background colour
- [ ] Create a light mode variant following the style guide
- [ ] Add a theme toggle component in the navigation
- [ ] Persist theme preference (localStorage + respect system preference)
- [ ] Ensure all colours, shadows, and UI elements adapt appropriately to each mode
