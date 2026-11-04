import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '@/config';

export async function GET() {
    const site = SITE_CONFIG.site;
    const blogs = await getCollection('blog');
    const pages = await getCollection('pages');
    const projects = await getCollection('projects');
    const photos = await getCollection('photos');
    const courses = await getCollection('courses');
    const selection = await getCollection('selection');

    const content = `\uFEFF# ${SITE_CONFIG.title} — index complet

> Index de tous les contenus de ${SITE_CONFIG.title}, avec la version web et la version Markdown brute.

## Articles

${blogs.map(entry => `- [${entry.data.title}](${site}/blog/${entry.id}) ([Markdown](${site}/raw/blog/${entry.id}.md))`).join('\n')}

## Pages

${pages.map(entry => `- [${entry.data.title}](${site}/${entry.id}) ([Markdown](${site}/raw/pages/${entry.id}.md))`).join('\n')}

## Projets

${projects.map(entry => `- [${entry.data.title}](${entry.data.url || `${site}/projets`}) - ${entry.data.description || ''}`).join('\n')}

## Galerie

${photos.map(entry => `- [${entry.data.name}](${site}/galerie/${entry.id})`).join('\n')}

## Courses

${courses.map(entry => `- [${entry.data.nom}](${site}/courses/${entry.id}) (${entry.data.sport}, ${entry.data.lieu}) ([Markdown](${site}/raw/courses/${entry.id}.md))`).join('\n')}

## Ma sélection

${selection.map(entry => `- ${entry.data.nom}${entry.data.detail ? ` (${entry.data.detail})` : ''} — ${entry.data.categorie}`).join('\n')}
`;

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8'
        }
    });
}
