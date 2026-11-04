import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        author: z.string().optional(),
        copyrightBg: z.string().optional().nullable(),
        category: z.string(), // "Flavor"
        tags: z.array(z.string()).optional(),
        readingTime: z.string().optional(), // Now automated, but keeping as optional for override
        depth: z.string(), // e.g. "Beginner", "Intermediate", "Deep Dive" - "Cocktail Strength"
        copyright: z.object({
            enabled: z.boolean().optional(),
            declaration: z.string().optional(),
            proof: z.object({
                enabled: z.boolean().optional(),
                linkText: z.string().optional(),
                baseUrl: z.string().optional(),
                mode: z.enum(['static', 'dynamic']).optional(),
            }).optional(),
        }).optional(),
    }),
});

export { blog };

const pages = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/pages" }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
    }),
});


const photos = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/photos" }),
    schema: z.object({
        name: z.string(),
        date: z.coerce.date(),
        author: z.string().optional(),
        location: z.string().optional(),
        tag: z.array(z.string()).optional(),
    }),
});

const projects = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/projects" }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        github: z.string().url().optional(),
        url: z.string().url().optional(),
    }),
});

// Courses : une fiche par course (compétition, sortie…). Les clés sont en français.
const courses = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/courses" }),
    schema: z.object({
        nom: z.string(),                          // Nom de la course
        sport: z.string(),                        // "Course à pied", "Trail", "Triathlon", "Vélo"…
        date: z.coerce.date(),                    // Date de la course (AAAA-MM-JJ)
        lieu: z.string(),                         // "Paris, France" (sert aussi au fond de carte)
        coordonnees: z.string().optional(),       // "48.8566, 2.3522" (optionnel, affine la carte)
        distance: z.number().positive().optional(),   // en km, ex. 42.195
        denivele: z.number().nonnegative().optional(), // D+ en mètres
        temps: z.string().regex(/^\d{1,3}:\d{2}(:\d{2})?$/, "Format attendu : h:mm:ss ou mm:ss").optional(),
        classement: z.string().optional(),        // ex. "123 / 2 450"
        classementCategorie: z.string().optional(), // ex. "12 / 300 (M35)"
        tags: z.array(z.string()).optional(),
    }),
});

// Ma sélection : matériel, livres… (liens d'affiliation). Tout est dans un seul fichier YAML.
const selection = defineCollection({
    loader: file("src/content/selection.yaml"),
    schema: z.object({
        categorie: z.string(),                 // "Matériel de course", "Livres", "Tech"…
        nom: z.string(),
        detail: z.string().optional(),         // marque, auteur…
        avis: z.string().optional(),           // ton avis en une ou deux phrases
        image: z.string().optional(),          // URL ou chemin dans public/, ex. "/selection/montre.jpg"
        lien: z.string().url(),
        affilie: z.boolean().default(true),    // false si le lien n'est pas un lien affilié
    }),
});

export const collections = { blog, pages, photos, projects, courses, selection };
