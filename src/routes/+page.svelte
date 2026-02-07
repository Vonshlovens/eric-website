<script lang="ts">
  import SkillsMarquee from '$lib/components/SkillsMarquee.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import Hero from '$lib/components/sections/Hero.svelte';
  import CoreCompetencies from '$lib/components/sections/CoreCompetencies.svelte';
  import EngineeringLog from '$lib/components/sections/EngineeringLog.svelte';
  import WorkExperience from '$lib/components/sections/WorkExperience.svelte';
  import Education from '$lib/components/sections/Education.svelte';
  import Interests from '$lib/components/sections/Interests.svelte';
  import ContactCTA from '$lib/components/sections/ContactCTA.svelte';

  let { data } = $props();
</script>

<SEO
  title="Eric Evans - Full-Stack Developer"
  description="Building elegant solutions with modern web technologies. Portfolio showcasing projects in TypeScript, Svelte, SvelteKit, and more."
  url="https://example.com"
  image="/og-image.png"
  imageAlt="Eric Evans - Full-Stack Developer Portfolio"
  type="profile"
  author="Eric Evans"
  siteName="Eric Evans Portfolio"
  twitterHandle="@ericevans"
  keywords={[
    'full-stack developer',
    'web development',
    'TypeScript',
    'Svelte',
    'SvelteKit',
    'Deno',
    'React',
    'software engineer',
    'portfolio',
    'open source'
  ]}
/>

<!-- Main Content -->
<main class="pt-16" id="main-content">
  <!-- Hero Section -->
  <Hero githubStats={data.githubStats} />

  <!-- Core Competencies -->
  <CoreCompetencies />

  <!-- Skills Marquee -->
  <SkillsMarquee />

  <!-- Engineering Log -->
  <EngineeringLog />

  <!-- Work Experience Section -->
  <WorkExperience />

  <!-- Education & Certifications -->
  <Education />

  <!-- Interests / Beyond Code -->
  <Interests />

  <!-- Contact CTA -->
  <ContactCTA />
</main>

<!-- Footer -->
<footer class="bg-bg border-t border-border-muted py-8">
  <div class="max-w-4xl mx-auto px-6">
    <div class="text-center font-mono text-sm text-fg-subtle">
      &copy; {new Date().getFullYear()} Eric Evans. Built with SvelteKit.
    </div>
  </div>
</footer>
