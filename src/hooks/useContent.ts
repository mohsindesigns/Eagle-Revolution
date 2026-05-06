import { useContentContext } from "../context/ContentContext";

export const useContent = () => {
    const completeData = useContentContext();

    // Deep fallback helper to prevent undefined.property crashes
    const getSafe = (data: any, key: string, fallback: any = {}) => {
        return data?.[key] || fallback;
    };

    const footer = getSafe(completeData, 'footer');
    const footerServices = getSafe(footer, 'services', { title: "Our Services", materials: { title: "Premium Materials", items: [] } });
    const footerContact = getSafe(footer, 'contact', { title: "Contact Us", email: "", phone: "", address: "", emergency: "", areas: "" });
    const footerCompany = getSafe(footer, 'company', { name: "Eagle Revolution", tagline: "Veteran Owned & Operated", description: "", logo: "" });
    const footerBottom = getSafe(footer, 'bottom', { copyright: "© 2026 Eagle Revolution", rights: "All Rights Reserved", tagline: "", links: [] });
    const footerMarquee = getSafe(footer, 'marquee', { texts: [], speed: 30, repeats: 8 });
    const footerCertifications = getSafe(footer, 'certifications', []);

    return {
        navbar: getSafe(completeData, 'navbar', { menu: [], logo: "", cta: { text: "Get Quote", href: "/contact" } }),
        hero: getSafe(completeData, 'hero', { headlines: [], description: "", buttons: [], stats: [], images: [] }),
        about: getSafe(completeData, 'about'),
        services: (() => {
            const s = getSafe(completeData, 'services', { services: [] });
            // Normalize: if it's already an array, wrap it in the expected object structure
            return Array.isArray(s) ? { services: s } : s;
        })(),
        leadership: (() => {
            const l = getSafe(completeData, 'leadership', {});
            // If it's effectively empty, use fallback
            if (!l.ceo || !l.ceo.name) {
                return {
                    section: {
                        badge: "Our Leadership",
                        headline: "Meet the Team Behind <span class=\"text-primary\">Eagle Revolution</span>",
                        description: "Veterans and experts dedicated to soaring beyond your expectations."
                    },
                    ceo: {
                        name: "Brandon Anderson",
                        title: "Owner & Founder",
                        image: { src: "/src/assets/ownerupdatedimage.jpeg" },
                        alt: "Brandon Anderson - Owner of Eagle Revolution",
                        badges: { top: "U.S. Army Veteran", bottom: "Combat Sports Official" },
                        quotes: ["At Eagle Revolution, we bring military precision and battlefield discipline to every roof, window, and deck we build."],
                        description: "<p>Brandon Anderson is a U.S. Army veteran and globally licensed combat sports official who founded Eagle Revolution to bring a higher standard of excellence to the construction industry in St. Louis.</p>",
                        socials: [{ icon: "Linkedin", url: "https://www.linkedin.com/company/eagle-revolution" }]
                    }
                };
            }
            return l;
        })(),
        portfolio: (() => {
            const p = getSafe(completeData, 'portfolio', {});
            // If it's effectively empty (no projects), use fallback
            if (!p.projects || !Array.isArray(p.projects) || p.projects.length === 0) {
                return {
                    section: {
                        badge: "Recent Projects",
                        headline: "Our Recent <span class=\"text-primary\">Transformations</span>"
                    },
                    projects: [
                        {
                            number: "01",
                            title: "Lakeside Composite Deck",
                            category: "Decks",
                            location: "Lake Ozark, MO",
                            year: "2024",
                            desc: "Expansive composite deck with built-in lighting.",
                            image: "/src/assets/outdoor-sitting-desk.png"
                        },
                        {
                            number: "02",
                            title: "St. Louis Roofing Project",
                            category: "Roofing",
                            location: "St. Louis, MO",
                            year: "2024",
                            desc: "Full asphalt shingle replacement with 50-year warranty.",
                            image: "/src/assets/roof1.jpg.jpeg"
                        }
                    ],
                    button: { text: "View Full Gallery", link: "/gallery" }
                };
            }
            return p;
        })(),
        testimonials: getSafe(completeData, 'testimonials', {
            section: { badge: "", headline: "", description: "" },
            items: []
        }),
        whyChooseUs: getSafe(completeData, 'whyChooseUs', {
            section: { badge: "", headline: "", description: "" },
            features: [],
            stats: [],
            cta: { badge: "", title: "", description: "", trustBadges: [], buttons: [] }
        }),
        faq: getSafe(completeData, 'faq', {
            section: { badge: "", headline: "", title: "", description: "" },
            categories: [],
            items: []
        }),
        quote: getSafe(completeData, 'quote', {
            section: { badge: "", headline: "", description: "" },
            services: [],
            projectTypes: [],
            timelines: [],
            success: { title: "", message: "", response: "", buttonText: "" }
        }),
        footer: {
            ...footer,
            services: footerServices,
            contact: footerContact,
            company: footerCompany,
            bottom: footerBottom,
            marquee: footerMarquee,
            certifications: footerCertifications,
            newsletter: getSafe(footer, 'newsletter', { placeholder: "Enter your email", buttonText: "Subscribe" })
        },
        team: getSafe(completeData, 'team', {
            section: { badge: "", headline: "", description: "" },
            members: []
        }),
        careers: getSafe(completeData, 'careers', {
            section: { badge: "", headline: "", description: "" },
            roles: [],
            success: { title: "", description: "" },
            labels: { name: "", email: "", role: "", summary: "" }
        }),
        aboutPage: {
            ...(completeData?.aboutPage || {}),
            // Root-level overrides for dynamic pages
            ...(completeData?.hero ? { hero: completeData.hero } : {}),
            ...(completeData?.mission ? { mission: completeData.mission } : {}),
            ...(completeData?.story ? { story: completeData.story } : {}),
            ...(completeData?.values ? { values: completeData.values } : {}),
            ...(completeData?.capabilities ? { capabilities: completeData.capabilities } : {}),
            ...(completeData?.stats ? { stats: completeData.stats } : {}),
            ...(completeData?.ctaBanner ? { ctaBanner: completeData.ctaBanner } : {}),
            ...(completeData?.recognition ? { recognition: completeData.recognition } : {}),
        },
        images: getSafe(completeData, 'images', {}),
        loader: getSafe(completeData, 'loader', { company: { name: "Eagle Revolution", tagline: "Veteran Owned" }, phases: { simpleDark: 200, roofDraw: 300, logoText: 400, ready: 100 } }),
        quickQuote: getSafe(completeData, 'quickQuote', {
            title: "",
            description: "",
            buttonText: ""
        }),
        hours: getSafe(completeData, 'hours'),
        contactPage: getSafe(completeData, 'contactPage', {
            header: { badge: "", headline: "", description: "" },
            formFields: [],
            info: {},
            social: {}
        }),
        galleryPage: getSafe(completeData, 'galleryPage', {
            header: { badge: "", title: "", description: "" }
        }),
        brandStore: getSafe(completeData, 'brandStore', {
            section: { badge: "", headline: "", description: "" },
            items: []
        }),
        serviceDetailPage: getSafe(completeData, 'serviceDetailPage'),
        settings: completeData?.settings || { siteTitle: "Eagle Revolution", siteTemplate: "%s | Eagle Revolution", favicon: "/eagle-logo.png" },
        faqPage: getSafe(completeData, 'faqPage'),
        blogSection: getSafe(completeData, 'blogSection', {
            title: "Latest from the Blog",
            subtitle: "Insights & News",
            description: "Stay updated with the latest trends, tips, and news from the roofing and construction industry.",
            selectedPosts: []
        }),
        allBlogs: Array.isArray(completeData?.allBlogs) ? completeData.allBlogs : [],
    };
};
