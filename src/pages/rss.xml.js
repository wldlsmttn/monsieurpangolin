import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '@/config';

export async function GET(context) {
    const posts = await getCollection('blog');
    const courses = await getCollection('courses');
    
    const allItems = [
        ...posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/blog/${post.id}/`,
        })),
        ...courses.map((course) => ({
            title: `Course : ${course.data.nom}`,
            pubDate: course.data.date,
            description: `${course.data.sport}, ${course.data.lieu}`,
            link: `/courses/${course.id}/`,
        }))
    ];

    allItems.sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

    return rss({
        title: SITE_CONFIG.title, 
        description: SITE_CONFIG.description,
        site: context.site || SITE_CONFIG.site, 
        items: allItems,
        customData: '<language>fr-fr</language>',
    });
}
