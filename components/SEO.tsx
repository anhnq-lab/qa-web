import { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
}

const defaultMeta = {
    siteName: 'BIM Tech Vietnam',
    title: 'Chuyên gia Chuyển đổi số Xây dựng | BIM & Công nghệ',
    description: 'Tư vấn BIM, giải pháp phần mềm, và đào tạo chuyển đổi số cho doanh nghiệp xây dựng Việt Nam. 10+ năm kinh nghiệm, 100+ doanh nghiệp tin dùng.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=630&fit=crop',
    url: 'https://bimtech.vn',
};

const updateMeta = (name: string, content: string, property = false) => {
    const attr = property ? 'property' : 'name';
    let element = document.querySelector(`meta[${attr}="${name}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
};

const SEO = ({
    title,
    description,
    image,
    url,
    type = 'website',
}: SEOProps) => {
    useEffect(() => {
        const seo = {
            title: title ? `${title} | ${defaultMeta.siteName}` : defaultMeta.title,
            description: description || defaultMeta.description,
            image: image || defaultMeta.image,
            url: url || defaultMeta.url,
        };

        // Update document title
        document.title = seo.title;

        // Update meta tags
        updateMeta('description', seo.description);

        // Open Graph
        updateMeta('og:type', type, true);
        updateMeta('og:site_name', defaultMeta.siteName, true);
        updateMeta('og:title', seo.title, true);
        updateMeta('og:description', seo.description, true);
        updateMeta('og:image', seo.image, true);
        updateMeta('og:url', seo.url, true);

        // Twitter
        updateMeta('twitter:card', 'summary_large_image');
        updateMeta('twitter:title', seo.title);
        updateMeta('twitter:description', seo.description);
        updateMeta('twitter:image', seo.image);

    }, [title, description, image, url, type]);

    return null;
};

export default SEO;
