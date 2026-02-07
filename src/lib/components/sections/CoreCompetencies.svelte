<script lang="ts">
  interface Competency {
    id: string;
    icon: string;
    title: string;
    description: string;
  }

  const competencies: Competency[] = [
    {
      id: 'cloud',
      icon: 'cloud_queue',
      title: 'Cloud Infrastructure',
      description:
        'Designing resilient architectures on AWS/GCP using Kubernetes, Terraform, and high-performance container orchestration.'
    },
    {
      id: 'ai',
      icon: 'psychology',
      title: 'Artificial Intelligence',
      description:
        'MLOps integration and RAG architecture implementation. Deploying production-ready LLM pipelines and inference engines.'
    },
    {
      id: 'db',
      icon: 'database',
      title: 'Database Admin',
      description:
        'Advanced optimization for PostgreSQL and NoSQL environments. Expertise in data sharding, replication, and high-concurrency tuning.'
    }
  ];
</script>

<section class="py-16 md:py-20" aria-label="Core Competencies">
  <div class="max-w-7xl mx-auto px-6 md:px-12">
    <!-- Section Header -->
    <div class="flex items-center gap-2 mb-8">
      <span class="material-symbols-outlined text-accent" aria-hidden="true">hub</span>
      <h2 class="text-text-white text-xl font-mono font-bold uppercase tracking-[0.2em]">
        Core Competencies
      </h2>
    </div>

    <!-- 3-Column Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each competencies as comp (comp.id)}
        <div
          class="group bg-surface hover:bg-surface-highlight p-8 rounded border border-border-dim transition-all duration-300 hover:border-accent"
        >
          <!-- Icon Box -->
          <div
            class="bg-primary/50 w-14 h-14 rounded flex items-center justify-center mb-6 border border-border-dim group-hover:border-accent/50 transition-colors duration-300"
          >
            <span
              class="material-symbols-outlined text-text-muted group-hover:text-accent text-3xl transition-colors duration-300"
              aria-hidden="true"
            >
              {comp.icon}
            </span>
          </div>

          <h3 class="text-text-white font-mono font-bold mb-3 text-lg">{comp.title}</h3>
          <p class="text-sm text-text-muted font-mono leading-relaxed">{comp.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
