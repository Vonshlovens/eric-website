import type { PageServerLoad } from './$types';

export interface GitHubStats {
	repos: number;
	commits: number;
	accountAgeSec: number;
}

const FALLBACK: GitHubStats = {
	repos: 43,
	commits: 4281,
	accountAgeSec: 852_037_704
};

const GITHUB_USERNAME = 'Vonshlovens';

let cached: { stats: GitHubStats; timestamp: number } | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// Return cached data if fresh
	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		setHeaders({ 'Cache-Control': 'public, max-age=600' });
		return { githubStats: cached.stats };
	}

	try {
		const headers: Record<string, string> = {};
		const token = typeof process !== 'undefined'
			? process.env?.GITHUB_TOKEN
			: undefined;
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
		if (!userRes.ok) return { githubStats: FALLBACK };

		const userData = await userRes.json();
		const repos = userData.public_repos ?? FALLBACK.repos;
		const createdAt = new Date(userData.created_at);
		const accountAgeSec = Math.floor((Date.now() - createdAt.getTime()) / 1000);

		let commits = FALLBACK.commits;
		try {
			const commitRes = await fetch(
				`https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}`,
				{
					headers: {
						...headers,
						Accept: 'application/vnd.github.cloak-preview+json'
					}
				}
			);
			if (commitRes.ok) {
				const commitData = await commitRes.json();
				commits = commitData.total_count ?? FALLBACK.commits;
			}
		} catch {
			// commit search failed, use fallback
		}

		const stats: GitHubStats = { repos, commits, accountAgeSec };
		cached = { stats, timestamp: Date.now() };

		setHeaders({ 'Cache-Control': 'public, max-age=600' });
		return { githubStats: stats };
	} catch {
		return { githubStats: FALLBACK };
	}
};
