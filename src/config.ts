export const SITE_CONFIG = {
    title: "Monsieur Pangolin",
    logoSrc: "/favicon.svg",
    description: "Blog, photos, courses et sélection de Monsieur Pangolin.",
    author: "Monsieur Pangolin",
    authorPhonetic: "",
    signature: "MP",
    site: "https://monsieurpangolin.com",
    imageServer: ["https://images.pexels.com"],
    postsPerPage: 6,
    projectsPerPage: 12,
    defaultImage: "/blog-placeholder-1.png",
    // Semantic "AI Intel" search needs the Cloudflare Vectorize/MCP backend, which is not deployed on Netlify.
    aiSearch: false,
    nav: [
        { text: "Blog", href: "/blog" },
        { text: "Galerie", href: "/galerie" },
        { text: "Courses", href: "/courses" },
        { text: "Sélection", href: "/selection" },
    ],
    homepage: {
        harmonicSystem: {
            seed: 2026,
            speed: 0.0042
        },
        links: [
            { text: "Lire le blog", href: "/blog" },
            { text: "Voir mes courses", href: "/courses" }
        ]
    },
    footer: {
        social: [
            { text: "Projets", href: "/projets" },
            { text: "À propos", href: "/a-propos" }
        ],
        copyright: "Monsieur Pangolin. Thème : Growing Galaxy."
    },
    selection: {
        // Ordre d'affichage des rubriques de /selection (les autres catégories suivent)
        categories: ["Matériel de course", "Livres"],
        // Passe à true si tu utilises le programme Partenaires Amazon : ajoute la mention obligatoire
        partenaireAmazon: false,
    },
    articleCopyright: {
        enabled: true,
        declaration: "Toute reproduction, diffusion ou transmission de cet article, sous quelque forme que ce soit, est interdite sans l’autorisation écrite préalable de l’auteur.",
        proof: {
            enabled: false,
            linkText: "Vérifier l’authenticité",
            baseUrl: "https://proofs.ceda.is",
            mode: "dynamic" // 'static' uses baseUrl as is, 'dynamic' appends '/blog/[slug]'
        }
    }
};
