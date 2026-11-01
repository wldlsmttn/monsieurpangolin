export const SITE_CONFIG = {
    title: "Monsieur Pangolin",
    logoSrc: "/favicon.svg",
    description: "A curated space for digital galleries and storytelling.",
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
        { text: "Gallery", href: "/gallery" },
        { text: "Traces", href: "/traces" },
    ],
    homepage: {
        harmonicSystem: {
            seed: 2026,
            speed: 0.0042
        },
        links: [
            { text: "Read the blog", href: "/blog" },
            { text: "Explore the Traces", href: "/traces" }
        ]
    },
    footer: {
        social: [
            { text: "Projects", href: "/projects" },
            { text: "Elsewhere", href: "/elsewhere" }
        ],
        copyright: "Monsieur Pangolin. Theme: Growing Galaxy."
    },
    elsewhere: [
        {
            name: "GitHub",
            handle: "wldlsmttn",
            url: "https://github.com/wldlsmttn",
        }
    ],
    articleCopyright: {
        enabled: true,
        declaration: "No part of this article may be reproduced, distributed, or transmitted in any form or by any means without the prior written permission of the author.",
        proof: {
            enabled: false,
            linkText: "Verify Authenticity",
            baseUrl: "https://proofs.ceda.is",
            mode: "dynamic" // 'static' uses baseUrl as is, 'dynamic' appends '/blog/[slug]'
        }
    }
};
