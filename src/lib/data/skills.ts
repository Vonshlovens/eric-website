/**
 * Skill categories for the radar chart visualization.
 * Spec: specs/skill-radar.md
 */

export interface SkillCategory {
	label: string;
	proficiency: number; // 0–100 scale
	skills: string[];
}

export const skillCategories: SkillCategory[] = [
	{
		label: 'Frontend',
		proficiency: 90,
		skills: ['Svelte', 'React', 'TypeScript', 'Tailwind', 'HTML/CSS'],
	},
	{
		label: 'Backend',
		proficiency: 85,
		skills: ['Deno', 'Node', 'Go', 'FastAPI', 'Python'],
	},
	{
		label: 'DevOps',
		proficiency: 80,
		skills: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Git'],
	},
	{
		label: 'Cloud',
		proficiency: 75,
		skills: ['Azure', 'GCP', 'AWS', 'Serverless', 'CDN'],
	},
	{
		label: 'Databases',
		proficiency: 80,
		skills: ['PostgreSQL', 'Redis', 'MongoDB', 'SQLite'],
	},
	{
		label: 'AI / ML',
		proficiency: 70,
		skills: ['LLMs', 'RAG', 'MLOps', 'Prompt Engineering'],
	},
];
