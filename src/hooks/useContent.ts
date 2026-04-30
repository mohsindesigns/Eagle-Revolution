import { useContentContext } from "../context/ContentContext";

export const useContent = () => {
    const completeData = useContentContext();

    return {
        navbar: completeData?.navbar || {},
        hero: completeData?.hero || {},
        about: completeData?.about || {},
        services: completeData?.services || {},
        leadership: completeData?.leadership || {},
        portfolio: completeData?.portfolio || {},
        testimonials: completeData?.testimonials || {},
        whyChooseUs: completeData?.whyChooseUs || {},
        faq: completeData?.faq || {},
        quote: completeData?.quote || {},
        footer: completeData?.footer || {},
        team: completeData?.team || {},
        careers: completeData?.careers || {},
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
        images: completeData?.images || {},
        loader: completeData?.loader || {},
        quickQuote: completeData?.quickQuote || {},
        hours: completeData?.hours || {},
        contactPage: completeData?.contactPage || {},
        galleryPage: completeData?.galleryPage || {},
        brandStore: completeData?.brandStore || {},
        serviceDetailPage: completeData?.serviceDetailPage || {},
        settings: completeData?.settings || { siteTitle: "Eagle Revolution", siteTemplate: "%s | Eagle Revolution", favicon: "/eagle-logo.png" },
        faqPage: completeData?.faqPage || {},
    };
};