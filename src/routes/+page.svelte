<script lang="ts">
  import SkillRadar from '$lib/components/sections/SkillRadar.svelte';
  import Hero from '$lib/components/sections/Hero.svelte';
  import EngineeringLog from '$lib/components/sections/EngineeringLog.svelte';
  import WorkExperience from '$lib/components/sections/WorkExperience.svelte';
  import Education from '$lib/components/sections/Education.svelte';
  import Interests from '$lib/components/sections/Interests.svelte';
  import ContactCTA from '$lib/components/sections/ContactCTA.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';

  let { data } = $props();

  let contactOpen = $state(false);
  let ctaComponent = $state<ContactCTA>();

  function openContactForm() {
    contactOpen = true;
  }
</script>

<!-- Main Content -->
<main class="pt-16" id="main-content">
  <!-- Hero Section -->
  <Hero githubStats={data.githubStats} />

  <!-- Skill Radar -->
  <SkillRadar />

  <!-- Engineering Log -->
  <EngineeringLog />

  <!-- Work Experience Section -->
  <WorkExperience />

  <!-- Education & Certifications -->
  <Education />

  <!-- Interests / Beyond Code -->
  <Interests />

  <!-- Contact CTA -->
  <ContactCTA bind:this={ctaComponent} onconnect={openContactForm} />
</main>

<!-- Contact Form Modal -->
<ContactForm bind:open={contactOpen} triggerEl={ctaComponent?.getTriggerEl()} />
