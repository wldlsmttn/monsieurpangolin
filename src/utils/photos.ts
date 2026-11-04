/// <reference types="astro/client" />
import { getCollection, type CollectionEntry } from 'astro:content';
import type { PhotoEntry, PhotoImage } from '@/types/photo';
import { SITE_CONFIG } from '@/config';

export function parsePhotoBody(body: string): PhotoImage[] {
    if (!body) return [];

    // Split the body by the image markdown syntax ![alt](url)
    const parts = body.split(/!\[([^\]]*)\]\(([^)]+)\)/);
    const images: PhotoImage[] = [];

    for (let i = 1; i < parts.length; i += 3) {
        const alt = parts[i];
        const url = parts[i + 1];
        const description = parts[i + 2]?.trim();

        images.push({
            url,
            alt: alt || undefined,
            description: description || undefined,
        });
    }

    return images;
}

export async function getPhotos(): Promise<PhotoEntry[]> {
    const collection = await getCollection('photos');

    const photos = collection.map((entry: CollectionEntry<'photos'>) => {
        const bodyText = entry.body || '';
        const images = parsePhotoBody(bodyText);

        if (!entry.data.name || images.length === 0) {
            throw new Error(`Album incomplet : il faut un nom et au moins une image (${entry.id})`);
        }

        if (!images[0]?.url) {
            throw new Error(`Album invalide : l'URL de la première image est vide (${entry.id})`);
        }

        const dateStr = entry.data.date instanceof Date
            ? entry.data.date.toISOString().split('T')[0]
            : String(entry.data.date);

        return {
            slug: entry.id,
            name: entry.data.name,
            date: dateStr,
            author: entry.data.author || SITE_CONFIG.author,
            location: entry.data.location,
            tag: entry.data.tag,
            images,
        } as PhotoEntry;
    });

    // Sort by date descending
    return photos.sort((a: PhotoEntry, b: PhotoEntry) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
