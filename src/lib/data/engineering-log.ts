export interface EngineeringLogEntry {
  id: string;
  name: string;
  category: string;
  image: string;
  problem: string;
  learnings: string;
  techStack: string[];
}

export const engineeringLog: EngineeringLogEntry[] = [
  {
    id: 'cloud-orchestrator',
    name: 'cloud_orchestrator',
    category: 'INFRASTRUCTURE',
    image: '/images/projects/cloud-orchestrator.webp',
    problem:
      'Managing multi-cloud deployments across AWS and GCP required manual intervention at every step — provisioning, scaling, and teardown were fragile, slow, and error-prone.',
    learnings:
      'Declarative infrastructure-as-code with Terraform modules and a thin orchestration layer in Go reduced deployment time by 80% and eliminated configuration drift across environments.',
    techStack: ['Go', 'Terraform', 'AWS', 'GCP', 'Docker', 'Kubernetes']
  },
  {
    id: 'ml-pipeline',
    name: 'ml_data_pipeline',
    category: 'AI/ML',
    image: '/images/projects/ml-pipeline.webp',
    problem:
      'Training data arrived in inconsistent formats from dozens of sources. ETL jobs were brittle, with silent failures corrupting downstream model accuracy.',
    learnings:
      'Schema validation at ingestion plus idempotent transformation stages made the pipeline self-healing. Adopting Apache Arrow for in-memory columnar processing cut batch times in half.',
    techStack: ['Python', 'FastAPI', 'Apache Arrow', 'PostgreSQL', 'Redis', 'Docker']
  },
  {
    id: 'realtime-dashboard',
    name: 'realtime_metrics',
    category: 'FRONTEND',
    image: '/images/projects/realtime-dashboard.webp',
    problem:
      'The ops team relied on stale dashboards that refreshed every 5 minutes. During incidents, they were flying blind with no live telemetry.',
    learnings:
      'WebSocket streaming with server-sent backpressure and D3.js canvas rendering enabled sub-second metric updates at scale without overwhelming the browser.',
    techStack: ['Svelte', 'TypeScript', 'WebSocket', 'D3.js', 'Node.js']
  },
  {
    id: 'api-gateway',
    name: 'api_gateway',
    category: 'BACKEND',
    image: '/images/projects/api-gateway.webp',
    problem:
      'Microservices communicated directly, creating a tangled mesh of service-to-service calls with no centralized rate limiting, auth, or observability.',
    learnings:
      'A single Go reverse-proxy with plugin middleware for auth, rate limiting, and tracing simplified the architecture and gave full visibility into request flows at 10k+ req/s.',
    techStack: ['Go', 'Redis', 'Docker', 'gRPC', 'Prometheus']
  },
  {
    id: 'db-migration-tool',
    name: 'schema_migrator',
    category: 'DATABASE',
    image: '/images/projects/db-migration.webp',
    problem:
      'Database schema changes were applied manually via ad-hoc SQL scripts, leading to version mismatches between staging and production and occasional data loss.',
    learnings:
      'Version-controlled migration files with rollback support and a dry-run mode eliminated surprises. Integrating into CI ensured every deploy ran migrations atomically.',
    techStack: ['Rust', 'PostgreSQL', 'SQLite', 'GitHub Actions']
  },
  {
    id: 'component-lib',
    name: 'ui_component_lib',
    category: 'FRONTEND',
    image: '/images/projects/component-lib.webp',
    problem:
      'Every new feature meant rebuilding the same buttons, modals, and form inputs from scratch. Inconsistent implementations created accessibility gaps across products.',
    learnings:
      'A headless component library following WAI-ARIA patterns with composable slot APIs let teams ship consistent, accessible UIs without fighting the framework.',
    techStack: ['Svelte', 'TypeScript', 'CSS', 'Storybook', 'Vitest']
  }
];
