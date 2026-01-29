<script lang="ts">
  /**
   * SEO Component - Comprehensive meta tags for search engines and social media
   *
   * Features:
   * - Open Graph tags for rich social media previews
   * - Twitter Card metadata
   * - JSON-LD structured data for search engines
   * - Canonical URLs
   * - Robots directives
   */

  interface SEOProps {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    imageAlt?: string;
    type?: 'website' | 'profile' | 'article';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    siteName?: string;
    twitterHandle?: string;
    keywords?: string[];
    noindex?: boolean;
    nofollow?: boolean;
  }

  let {
    title = 'Eric Evans - Full-Stack Developer',
    description = 'Portfolio of Eric Evans, a full-stack developer specializing in modern web technologies, TypeScript, Svelte, and cloud architecture.',
    url = 'https://example.com',
    image = '/og-image.png',
    imageAlt = 'Eric Evans - Full-Stack Developer Portfolio',
    type = 'website',
    author = 'Eric Evans',
    publishedTime,
    modifiedTime,
    siteName = 'Eric Evans Portfolio',
    twitterHandle = '@ericevans',
    keywords = [
      'full-stack developer',
      'web development',
      'TypeScript',
      'Svelte',
      'SvelteKit',
      'Deno',
      'software engineer',
      'portfolio'
    ],
    noindex = false,
    nofollow = false
  }: SEOProps = $props();

  // Construct robots meta content
  const robotsContent = $derived([
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow'
  ].join(', '));

  // Construct JSON-LD structured data for Person schema
  const structuredData = $derived({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author,
    url: url,
    image: image,
    jobTitle: 'Full-Stack Developer',
    description: description,
    sameAs: [
      'https://github.com/Vonshlovens',
      'https://linkedin.com/in/ericevans',
      'https://twitter.com/ericevans'
    ]
  });

  // Construct full page title
  const fullTitle = $derived(title.includes('Eric Evans') ? title : `${title} | Eric Evans`);

  // Ensure image URL is absolute
  const absoluteImageUrl = $derived(image.startsWith('http') ? image : `${url}${image}`);
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{fullTitle}</title>
  <meta name="title" content={fullTitle} />
  <meta name="description" content={description} />
  <meta name="author" content={author} />
  {#if keywords.length > 0}
    <meta name="keywords" content={keywords.join(', ')} />
  {/if}
  <meta name="robots" content={robotsContent} />
  <link rel="canonical" href={url} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={absoluteImageUrl} />
  <meta property="og:image:alt" content={imageAlt} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:locale" content="en_US" />
  {#if publishedTime}
    <meta property="article:published_time" content={publishedTime} />
  {/if}
  {#if modifiedTime}
    <meta property="article:modified_time" content={modifiedTime} />
  {/if}

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={url} />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={absoluteImageUrl} />
  <meta name="twitter:image:alt" content={imageAlt} />
  {#if twitterHandle}
    <meta name="twitter:creator" content={twitterHandle} />
    <meta name="twitter:site" content={twitterHandle} />
  {/if}

  <!-- Additional Meta Tags -->
  <meta name="theme-color" content="#7B9BC7" media="(prefers-color-scheme: dark)" />
  <meta name="theme-color" content="#2C3E6B" media="(prefers-color-scheme: light)" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />

  <!-- Structured Data (JSON-LD) -->
  {@html `<script type="application/ld+json">${JSON.stringify(structuredData)}<\/script>`}
</svelte:head>
