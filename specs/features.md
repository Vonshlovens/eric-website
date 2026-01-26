# Portfolio Website Features Specification

## Overview
A modern, single-page application (SPA-style) portfolio website with optional secondary pages or modal-based sections. The site showcases professional experience, projects, and personal information in an engaging, accessible format.

## Architecture

### Navigation Pattern
**Primary Approach**: Single-page with smooth scrolling sections
**Alternative**: Modal/popover overlays for detailed content
**Secondary**: Separate routes for major sections (optional)

### Layout Structure
```
┌─────────────────────────────────┐
│         Navigation              │
├─────────────────────────────────┤
│         Hero/About Me           │
├─────────────────────────────────┤
│      Project Portfolio          │
├─────────────────────────────────┤
│      Work Experience            │
├─────────────────────────────────┤
│         Education               │
├─────────────────────────────────┤
│         Interests               │
├─────────────────────────────────┤
│       Contact Info              │
└─────────────────────────────────┘
```

---

## Features

### 1. About Me (Hero Section)

**Purpose**: First impression, professional introduction, value proposition

**Content**:
- Professional headshot or avatar
- Name and title/tagline
- Brief professional summary (2-3 sentences)
- Key skills/expertise highlights
- Call-to-action buttons (View Work, Contact Me)

**Implementation**:
```svelte
<!-- routes/+page.svelte -->
<section id="about" class="hero-section">
  <div class="container">
    <div class="hero-content">
      <img src="/avatar.jpg" alt="Profile" class="avatar" />

      <h1 class="hero-title">
        Eric Shlovens<span class="cursor">_</span>
      </h1>

      <p class="hero-tagline">
        Full-Stack Developer & Open Source Enthusiast
      </p>

      <p class="hero-bio">
        Building elegant solutions with modern web technologies.
        Passionate about developer experience and clean code.
      </p>

      <div class="hero-actions">
        <button onclick={() => scrollTo('projects')}>
          View Projects
        </button>
        <button onclick={() => openContact()}>
          Get in Touch
        </button>
      </div>
    </div>
  </div>
</section>
```

**Features**:
- Animated text typing effect for tagline
- Smooth fade-in on load
- Social media links (GitHub, LinkedIn, Twitter)
- Theme toggle (dark/light mode)
- Subtle parallax or gradient background

---

### 2. Project Portfolio

**Purpose**: Showcase technical skills through real projects

**Content** (per project):
- Project name and brief description
- Technologies used (tags/badges)
- Screenshot or demo GIF
- Key features/highlights
- Links (GitHub, live demo, case study)
- Optional: metrics (users, stars, performance)

**Implementation**:
```svelte
<section id="projects" class="projects-section">
  <h2>Featured Projects</h2>

  <div class="projects-grid">
    {#each projects as project}
      <article class="project-card">
        <div class="project-image">
          <img src={project.image} alt={project.name} />
          <div class="project-overlay">
            <a href={project.demo}>View Demo</a>
            <a href={project.github}>GitHub</a>
          </div>
        </div>

        <div class="project-content">
          <h3>{project.name}</h3>
          <p>{project.description}</p>

          <div class="project-tags">
            {#each project.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>

          <div class="project-stats">
            <span>⭐ {project.stars}</span>
            <span>🍴 {project.forks}</span>
          </div>
        </div>
      </article>
    {/each}
  </div>
</section>
```

**Data Structure**:
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  stars?: number;
  forks?: number;
  featured: boolean;
}
```

**Features**:
- Filterable by technology/category
- Sortable (newest, most popular)
- Grid layout (responsive: 1 col mobile, 2 cols tablet, 3 cols desktop)
- Hover effects (image zoom, overlay reveal)
- Optional: Modal for detailed case study
- Optional: GitHub API integration for live stats

---

### 3. Work Experience

**Purpose**: Professional background, career progression

**Content** (per position):
- Company name and logo
- Job title
- Duration (start - end or "Present")
- Location (city/remote)
- Key responsibilities (bullet points)
- Notable achievements
- Technologies used

**Implementation**:
```svelte
<section id="experience" class="experience-section">
  <h2>Work Experience</h2>

  <div class="timeline">
    {#each experiences as exp, i}
      <div class="timeline-item" class:animate-in={visible}>
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
          {#if i < experiences.length - 1}
            <div class="timeline-line"></div>
          {/if}
        </div>

        <article class="experience-card">
          <div class="experience-header">
            <img src={exp.logo} alt={exp.company} class="company-logo" />
            <div>
              <h3>{exp.title}</h3>
              <h4>{exp.company}</h4>
            </div>
          </div>

          <div class="experience-meta">
            <span>{exp.duration}</span>
            <span>{exp.location}</span>
          </div>

          <ul class="experience-duties">
            {#each exp.duties as duty}
              <li>{duty}</li>
            {/each}
          </ul>

          <div class="experience-tags">
            {#each exp.technologies as tech}
              <span class="tag">{tech}</span>
            {/each}
          </div>
        </article>
      </div>
    {/each}
  </div>
</section>
```

**Data Structure**:
```typescript
interface Experience {
  id: string;
  company: string;
  logo: string;
  title: string;
  duration: string;
  location: string;
  duties: string[];
  achievements?: string[];
  technologies: string[];
}
```

**Features**:
- Vertical timeline layout
- Chronological order (newest first)
- Expandable for full description
- Company logos/branding
- Scroll-triggered animations
- Optional: PDF resume download

---

### 4. Education

**Purpose**: Academic credentials, certifications, continuous learning

**Content**:
- Degree/certification name
- Institution
- Duration/graduation year
- Relevant coursework (optional)
- Achievements/honors (optional)
- Certifications with badges

**Implementation**:
```svelte
<section id="education" class="education-section">
  <h2>Education & Certifications</h2>

  <div class="education-grid">
    <!-- Degrees -->
    {#each degrees as degree}
      <article class="education-card">
        <div class="education-icon">🎓</div>
        <h3>{degree.name}</h3>
        <h4>{degree.institution}</h4>
        <p class="education-year">{degree.year}</p>
        {#if degree.honors}
          <p class="education-honors">{degree.honors}</p>
        {/if}
      </article>
    {/each}

    <!-- Certifications -->
    {#each certifications as cert}
      <article class="certification-card">
        <img src={cert.badge} alt={cert.name} class="cert-badge" />
        <h3>{cert.name}</h3>
        <p>{cert.issuer}</p>
        <p class="cert-date">{cert.date}</p>
        {#if cert.credentialUrl}
          <a href={cert.credentialUrl} target="_blank">
            View Credential →
          </a>
        {/if}
      </article>
    {/each}
  </div>
</section>
```

**Data Structure**:
```typescript
interface Education {
  id: string;
  type: 'degree' | 'certification';
  name: string;
  institution: string;
  year: string;
  honors?: string;
  badge?: string;
  credentialUrl?: string;
}
```

**Features**:
- Mixed grid layout (degrees + certifications)
- Badge/credential verification links
- Institution logos
- Hover effects for details
- Optional: Course highlights expandable

---

### 5. Interests

**Purpose**: Personal touch, cultural fit, conversation starters

**Content**:
- Personal hobbies
- Technical interests
- Open source contributions
- Side projects
- Reading/learning topics
- Community involvement

**Implementation**:
```svelte
<section id="interests" class="interests-section">
  <h2>Beyond Code</h2>

  <div class="interests-grid">
    {#each interests as interest}
      <div class="interest-card">
        <div class="interest-icon">{interest.icon}</div>
        <h3>{interest.title}</h3>
        <p>{interest.description}</p>

        {#if interest.links}
          <div class="interest-links">
            {#each interest.links as link}
              <a href={link.url}>{link.label} →</a>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- Optional: Reading list -->
  <div class="reading-section">
    <h3>Currently Reading</h3>
    <div class="book-shelf">
      {#each currentlyReading as book}
        <div class="book-card">
          <img src={book.cover} alt={book.title} />
          <p>{book.title}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
```

**Data Structure**:
```typescript
interface Interest {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji or icon
  links?: Array<{ label: string; url: string }>;
}
```

**Features**:
- Card-based layout
- Icons/emojis for visual interest
- Links to related content (blog posts, GitHub repos)
- Optional: Recently played games, books, music
- Optional: Blog post feed integration

---

### 6. Contact Info

**Purpose**: Easy ways to get in touch

**Content**:
- Email address
- Social media links
- Location (city/timezone)
- Availability status
- Contact form (optional)
- Calendar booking link (optional)

**Implementation**:
```svelte
<section id="contact" class="contact-section">
  <h2>Let's Connect</h2>

  <div class="contact-content">
    <!-- Contact Methods -->
    <div class="contact-methods">
      <a href="mailto:eric@example.com" class="contact-method">
        <span class="icon">📧</span>
        <span>eric@example.com</span>
      </a>

      <a href="https://github.com/eric" class="contact-method">
        <span class="icon">💻</span>
        <span>GitHub</span>
      </a>

      <a href="https://linkedin.com/in/eric" class="contact-method">
        <span class="icon">💼</span>
        <span>LinkedIn</span>
      </a>

      <a href="https://twitter.com/eric" class="contact-method">
        <span class="icon">🐦</span>
        <span>Twitter</span>
      </a>
    </div>

    <!-- Optional: Contact Form -->
    <form class="contact-form" method="POST" action="?/sendMessage">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
      />

      <textarea
        name="message"
        placeholder="Your Message"
        rows="6"
        required
      ></textarea>

      <button type="submit">Send Message</button>
    </form>

    <!-- Status -->
    <div class="availability-status">
      <div class="status-indicator available"></div>
      <p>Currently available for freelance work</p>
    </div>
  </div>
</section>
```

**Features**:
- Copy email on click
- Social links open in new tabs
- Contact form with validation
- Form submission via SvelteKit form action
- Success/error states
- Optional: Email service integration (SendGrid, Resend)
- Optional: Calendar booking (Cal.com, Calendly)

---

## Global Features

### Navigation

**Desktop**:
```svelte
<nav class="main-nav">
  <a href="/" class="logo">ES</a>

  <ul class="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#education">Education</a></li>
    <li><a href="#interests">Interests</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>

  <button class="theme-toggle" onclick={toggleTheme}>
    {isDark ? '☀️' : '🌙'}
  </button>
</nav>
```

**Mobile**:
```svelte
<nav class="mobile-nav">
  <a href="/" class="logo">ES</a>

  <button class="menu-toggle" onclick={toggleMenu}>
    {menuOpen ? '✕' : '☰'}
  </button>
</nav>

{#if menuOpen}
  <div class="mobile-menu">
    <ul>
      <li><a href="#about" onclick={closeMenu}>About</a></li>
      <!-- ... rest of links -->
    </ul>
  </div>
{/if}
```

**Features**:
- Fixed/sticky on scroll
- Active section highlighting
- Smooth scroll to anchors
- Mobile hamburger menu
- Theme toggle

### Footer

```svelte
<footer class="site-footer">
  <div class="footer-content">
    <p>&copy; {new Date().getFullYear()} Eric Shlovens</p>

    <div class="footer-links">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
    </div>

    <div class="footer-social">
      <a href="https://github.com/eric">GitHub</a>
      <a href="https://linkedin.com/in/eric">LinkedIn</a>
    </div>
  </div>
</footer>
```

### Analytics & SEO

```svelte
<!-- routes/+layout.svelte -->
<svelte:head>
  <title>Eric Shlovens - Full-Stack Developer</title>
  <meta name="description" content="Portfolio of Eric Shlovens, full-stack developer specializing in modern web technologies." />

  <!-- Open Graph -->
  <meta property="og:title" content="Eric Shlovens - Developer Portfolio" />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="/og-image.jpg" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />

  <!-- Analytics (optional) -->
  <!-- <script defer data-domain="yourdomain.com" src="..."></script> -->
</svelte:head>
```

---

## Technical Implementation

### Data Management

**Static Data** (src/lib/data/):
```
data/
├── projects.ts
├── experience.ts
├── education.ts
└── interests.ts
```

**Example** (projects.ts):
```typescript
export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'Awesome App',
    description: 'A full-stack application...',
    image: '/projects/awesome-app.png',
    tags: ['SvelteKit', 'TypeScript', 'Deno'],
    github: 'https://github.com/...',
    demo: 'https://awesome-app.com',
    featured: true
  },
  // ...
];
```

### Routes Structure

```
routes/
├── +layout.svelte       # Global layout, theme, navigation
├── +page.svelte         # Homepage (all sections)
├── +page.ts             # Load data for homepage
└── api/
    └── contact/
        └── +server.ts   # Contact form handler
```

### Component Organization

```
lib/
├── components/
│   ├── sections/
│   │   ├── Hero.svelte
│   │   ├── Projects.svelte
│   │   ├── Experience.svelte
│   │   ├── Education.svelte
│   │   ├── Interests.svelte
│   │   └── Contact.svelte
│   ├── ui/
│   │   ├── Card.svelte
│   │   ├── Button.svelte
│   │   ├── Tag.svelte
│   │   └── Modal.svelte
│   └── layout/
│       ├── Navigation.svelte
│       └── Footer.svelte
└── data/
    ├── projects.ts
    ├── experience.ts
    └── education.ts
```

---

## Performance Optimizations

### Image Optimization
- Use modern formats (WebP, AVIF)
- Lazy load below-fold images
- Responsive images with srcset
- Optimize file sizes

### Code Splitting
- Dynamic imports for modals
- Lazy load non-critical sections
- Preload critical assets

### Caching
- Static asset caching headers
- Service worker for offline (optional)
- Prerender static pages

---

## Accessibility

- Semantic HTML throughout
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management in modals
- Screen reader friendly
- Color contrast compliance (WCAG AA)
- Reduced motion support

---

## Future Enhancements

### Phase 2
- [ ] Blog integration
- [ ] Project case studies (detailed pages)
- [ ] Testimonials section
- [ ] Interactive skill visualization
- [ ] Live GitHub activity feed

### Phase 3
- [ ] Multi-language support
- [ ] Resume PDF generator
- [ ] Project search/filtering
- [ ] Dark/light/auto theme preference
- [ ] RSS feed for blog

### Optional
- [ ] Easter eggs (Konami code, hidden games)
- [ ] ASCII art in console
- [ ] Terminal emulator theme option
- [ ] Visitor counter (retro style)
