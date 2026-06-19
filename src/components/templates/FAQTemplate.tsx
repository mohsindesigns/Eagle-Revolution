"use client";

import { useContent } from "../../hooks/useContent";
import PageInlineFaqs from "@/components/PageInlineFaqs";

export default function FAQTemplate({ pageData, params }: { pageData?: any, params?: any }) {
    const { faq: globalFaq } = useContent();

    // Use page-specific FAQs if provided (e.g. from dynamic pages), otherwise fallback to global
    const pageFaqs = pageData?.faqs || pageData?.content?.faqs || pageData?.content?.faq?.items;
    const faq = pageFaqs ? { ...globalFaq, items: pageFaqs } : globalFaq;
    const { section, items = [] } = faq || {};
    const bulkSchema = pageData?.content?.faqSchemaMarkup || pageData?.faqSchemaMarkup;

    return (
        <main className="min-h-screen bg-background pt-16">
            <PageInlineFaqs 
                faqs={items} 
                faqSchemaMarkup={bulkSchema} 
                title={section?.headline} 
                subtitle={section?.description}
                badge={section?.badge}
            />
        </main>
    );
}
