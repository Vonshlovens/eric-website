<script lang="ts">
  import { scrollReveal } from '$lib/actions/scrollReveal';
  import { motionStore } from '$lib/stores/motion.svelte';
  import { skillCategories, type SkillCategory } from '$lib/data/skills';

  interface FocusArea {
    icon: string;
    title: string;
    description: string;
  }

  const focusAreas: FocusArea[] = [
    {
      icon: 'cloud_queue',
      title: 'Cloud Infrastructure',
      description: 'Resilient architectures on AWS/GCP with Kubernetes, Terraform, and container orchestration.',
    },
    {
      icon: 'psychology',
      title: 'Artificial Intelligence',
      description: 'MLOps integration, RAG architecture, and production-ready LLM pipelines.',
    },
    {
      icon: 'database',
      title: 'Database Admin',
      description: 'PostgreSQL and NoSQL optimization with data sharding, replication, and high-concurrency tuning.',
    },
  ];

  interface Props {
    categories?: SkillCategory[];
  }

  let { categories = skillCategories }: Props = $props();

  // Chart geometry
  const padding = 50; // Extra space for axis labels
  const chartSize = 300;
  const size = chartSize + padding * 2;
  const center = size / 2;
  const rings = 3; // Familiar, Proficient, Expert
  const maxRadius = 120;

  // Hover state
  let hoveredIndex = $state<number | null>(null);
  let tooltipX = $state(0);
  let tooltipY = $state(0);

  // Draw-in animation state
  let revealed = $state(false);
  let svgEl = $state<SVGSVGElement>();

  // Watch for the revealed class on the SVG's parent
  $effect(() => {
    if (!svgEl) return;
    const container = svgEl.closest('.scroll-reveal');
    if (!container) {
      revealed = true;
      return;
    }
    if (container.classList.contains('revealed')) {
      revealed = true;
      return;
    }
    const observer = new MutationObserver(() => {
      if (container.classList.contains('revealed')) {
        revealed = true;
        observer.disconnect();
      }
    });
    observer.observe(container, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  });

  // Calculate polygon points for a given scale (0–1)
  function getPolygonPoints(values: number[], scale: number = 1): string {
    const count = values.length;
    return values
      .map((val, i) => {
        const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
        const r = (val / 100) * maxRadius * scale;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  }

  // Get ring polygon (uniform radius)
  function getRingPoints(radius: number): string {
    const count = categories.length;
    return Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  }

  // Get axis endpoint
  function getAxisEnd(index: number): { x: number; y: number } {
    const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
    return {
      x: center + maxRadius * Math.cos(angle),
      y: center + maxRadius * Math.sin(angle),
    };
  }

  // Get label position (just outside the outermost ring)
  function getLabelPos(index: number): { x: number; y: number; anchor: string } {
    const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
    const r = maxRadius + 20;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    // Text anchor based on position
    const cos = Math.cos(angle);
    let anchor = 'middle';
    if (cos > 0.3) anchor = 'start';
    else if (cos < -0.3) anchor = 'end';
    return { x, y, anchor };
  }

  // Get vertex position for data point
  function getVertex(index: number, proficiency: number): { x: number; y: number } {
    const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
    const r = (proficiency / 100) * maxRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  }

  const ringLabels = ['Familiar', 'Proficient', 'Expert'];

  // Derived values
  let dataPoints = $derived(categories.map((c) => c.proficiency));

  // JS-driven polygon draw-in animation (cross-browser; CSS points transition is non-standard)
  let animationScale = $state(0);
  let animRafId = $state(0);

  $effect(() => {
    if (motionStore.disabled) {
      animationScale = 1;
      return;
    }
    if (revealed && animationScale < 1) {
      const start = performance.now();
      const duration = 800;
      function animate(now: number) {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / duration);
        // ease-out cubic
        animationScale = 1 - Math.pow(1 - t, 3);
        if (t < 1) {
          animRafId = requestAnimationFrame(animate);
        }
      }
      animRafId = requestAnimationFrame(animate);
      return () => {
        if (animRafId) cancelAnimationFrame(animRafId);
      };
    }
  });

  let animatedPolygon = $derived(getPolygonPoints(dataPoints, animationScale));

  let hoverRafId = $state(0);

  function updateTooltipPosition(index: number, clientX: number, clientY: number) {
    if (hoverRafId) return;
    hoverRafId = requestAnimationFrame(() => {
      hoverRafId = 0;
      hoveredIndex = index;
      const rect = svgEl?.getBoundingClientRect();
      if (rect) {
        tooltipX = clientX - rect.left;
        tooltipY = clientY - rect.top;
      }
    });
  }

  function handleVertexHover(index: number, event: MouseEvent) {
    updateTooltipPosition(index, event.clientX, event.clientY);
  }

  function handleLabelHover(index: number, event: MouseEvent) {
    updateTooltipPosition(index, event.clientX, event.clientY);
  }

  function clearHover() {
    if (hoverRafId) {
      cancelAnimationFrame(hoverRafId);
      hoverRafId = 0;
    }
    hoveredIndex = null;
  }
</script>

<section class="py-16 md:py-20" id="skill-radar" aria-labelledby="skill-radar-heading">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="flex items-center gap-2 mb-8" use:scrollReveal>
      <span class="material-symbols-outlined text-accent" aria-hidden="true">radar</span>
      <h2 id="skill-radar-heading" class="text-text-white text-xl font-mono font-bold uppercase tracking-[0.2em]">
        Skill Radar
      </h2>
    </div>

    <!-- Focus Areas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" use:scrollReveal={{ stagger: true }}>
      {#each focusAreas as area}
        <div class="scroll-reveal group flex items-start gap-3 bg-surface p-4 rounded border border-border-dim transition-all duration-200 hover:border-accent/50 hover:bg-surface-highlight">
          <div class="shrink-0 bg-primary/50 w-10 h-10 rounded flex items-center justify-center border border-border-dim group-hover:border-accent/50 transition-colors duration-200">
            <span class="material-symbols-outlined text-text-muted group-hover:text-accent text-xl transition-colors duration-200" aria-hidden="true">
              {area.icon}
            </span>
          </div>
          <div class="min-w-0">
            <h3 class="text-text-white font-mono font-bold text-sm mb-1">{area.title}</h3>
            <p class="text-xs text-text-muted font-mono leading-relaxed">{area.description}</p>
          </div>
        </div>
      {/each}
    </div>

    <!-- Two-column layout: chart + breakdown -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" use:scrollReveal>
      <!-- Chart Container -->
      <div class="scroll-reveal bg-surface border border-border-dim rounded-lg p-6 md:p-8 flex justify-center max-w-[500px] mx-auto lg:mx-0 w-full">
        <div class="relative w-full" style="max-width: {size}px;">
          <!-- SVG Radar Chart (decorative) -->
          <svg
            bind:this={svgEl}
            viewBox="0 0 {size} {size}"
            class="radar-svg w-full h-auto"
            aria-hidden="true"
            role="presentation"
          >
            <!-- Grid rings -->
            {#each Array(rings) as _, ringIdx}
              {@const radius = (maxRadius / rings) * (ringIdx + 1)}
              <polygon
                points={getRingPoints(radius)}
                fill="none"
                stroke="var(--color-border-dim)"
                stroke-width="1"
                opacity="0.6"
              />
            {/each}

            <!-- Axis lines -->
            {#each categories as _, i}
              {@const end = getAxisEnd(i)}
              <line
                x1={center}
                y1={center}
                x2={end.x}
                y2={end.y}
                stroke="var(--color-border-dim)"
                stroke-width="1"
                opacity="0.4"
              />
            {/each}

            <!-- Data polygon -->
            <polygon
              points={animatedPolygon}
              fill="var(--color-accent)"
              fill-opacity="0.15"
              stroke="var(--color-accent)"
              stroke-width="2"
              class="radar-polygon"
              class:radar-polygon-animated={!motionStore.disabled}
              class:radar-polygon-revealed={revealed}
            />

            <!-- Axis labels (inside aria-hidden SVG; screen-reader table below) -->
            {#each categories as cat, i}
              {@const pos = getLabelPos(i)}
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <text
                x={pos.x}
                y={pos.y}
                text-anchor={pos.anchor}
                dominant-baseline="middle"
                class="radar-label"
                class:radar-label-active={hoveredIndex === i}
                onmouseenter={(e) => handleLabelHover(i, e)}
                onmouseleave={clearHover}
              >
                {cat.label}
              </text>
            {/each}

            <!-- Vertex dots (inside aria-hidden SVG; screen-reader table below) -->
            {#each categories as cat, i}
              {@const vertex = getVertex(i, cat.proficiency)}
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <circle
                cx={vertex.x}
                cy={vertex.y}
                r={hoveredIndex === i ? 6 : 4}
                fill="var(--color-accent)"
                class="radar-vertex"
                onmouseenter={(e) => handleVertexHover(i, e)}
                onmouseleave={clearHover}
              />
            {/each}
          </svg>

          <!-- Tooltip -->
          {#if hoveredIndex !== null}
            {@const cat = categories[hoveredIndex]}
            <div
              class="radar-tooltip"
              style="left: {tooltipX}px; top: {tooltipY - 12}px;"
            >
              <div class="font-mono text-xs uppercase tracking-wider text-accent mb-1.5">
                {cat.label}
                <span class="text-text-muted ml-1">— {cat.proficiency}%</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                {#each cat.skills as skill}
                  <span class="text-[11px] font-mono text-text-main bg-primary/50 border border-border-dim rounded px-1.5 py-0.5">
                    {skill}
                  </span>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Category Breakdown List -->
      <div class="space-y-4 scroll-reveal">
        {#each categories as cat, i}
          <div
            class="group flex items-start gap-4 p-4 rounded border border-border-dim bg-surface transition-all duration-200 hover:border-accent/50 hover:bg-surface-highlight"
            onmouseenter={() => hoveredIndex = i}
            onmouseleave={clearHover}
            role="listitem"
          >
            <!-- Proficiency bar -->
            <div class="shrink-0 w-12 text-right">
              <span class="font-mono text-sm text-accent font-bold">{cat.proficiency}%</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-mono text-sm font-bold text-text-white uppercase tracking-wider mb-1.5">
                {cat.label}
              </h3>
              <div class="w-full bg-primary/50 rounded-full h-1.5 mb-2">
                <div
                  class="bg-accent h-1.5 rounded-full transition-all duration-500"
                  style="width: {revealed || motionStore.disabled ? cat.proficiency : 0}%"
                ></div>
              </div>
              <div class="flex flex-wrap gap-1.5">
                {#each cat.skills as skill}
                  <span class="text-[11px] font-mono text-text-muted uppercase tracking-wider">
                    {skill}{cat.skills.indexOf(skill) < cat.skills.length - 1 ? ',' : ''}
                  </span>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Screen-reader accessible fallback table -->
    <div class="sr-only">
      <table>
        <caption>Technical skill proficiency by category</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Proficiency</th>
            <th scope="col">Skills</th>
          </tr>
        </thead>
        <tbody>
          {#each categories as cat}
            <tr>
              <td>{cat.label}</td>
              <td>{cat.proficiency}%</td>
              <td>{cat.skills.join(', ')}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<style>
  .radar-label {
    font-family: var(--font-mono);
    font-size: 11px;
    fill: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: fill 0.2s ease;
  }

  .radar-label-active {
    fill: var(--color-accent);
  }

  .radar-vertex {
    cursor: pointer;
    transition: r 0.2s ease;
  }

  .radar-polygon-animated:not(.radar-polygon-revealed) {
    opacity: 0;
  }

  .radar-polygon-animated.radar-polygon-revealed {
    opacity: 1;
    transition: opacity 0.4s ease-out;
  }

  .radar-tooltip {
    position: absolute;
    transform: translate(-50%, -100%);
    background: var(--color-surface-highlight);
    border: 1px solid var(--color-border-dim);
    border-radius: 0.5rem;
    padding: 0.75rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.24), 0 2px 4px rgba(0, 0, 0, 0.16);
    pointer-events: none;
    z-index: 20;
    white-space: nowrap;
    max-width: 280px;
  }

  @media (prefers-reduced-motion: reduce) {
    .radar-polygon-animated {
      transition: none !important;
    }
  }
</style>
