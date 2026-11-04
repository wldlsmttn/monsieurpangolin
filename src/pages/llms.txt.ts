import { SITE_CONFIG } from '@/config';

export async function GET() {
    const site = SITE_CONFIG.site;
    const title = SITE_CONFIG.title;
    const description = SITE_CONFIG.description;

    const content = `\uFEFF# ${title}

> ${description}

## Pages principales

- [Accueil](${site}/)
- [Blog](${site}/blog)
- [Galerie](${site}/galerie)
- [Courses](${site}/courses)
- [Projets](${site}/projets)
- [Ma sélection](${site}/selection)
- [À propos](${site}/a-propos)

## LLM & AI Services

- [Index complet](${site}/llms-full.txt) - Tous les contenus, avec liens vers le Markdown brut.

`;

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8'
        }
    });
}
