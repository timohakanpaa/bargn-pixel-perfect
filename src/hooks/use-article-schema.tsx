import { useEffect, useRef } from "react";

export interface ArticleSchemaData {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  publisher: string;
  keywords: string[];
  articleSection?: string;
  wordCount?: number;
  url?: string;
}

export const useArticleSchema = (articles: ArticleSchemaData[]) => {
  // Stabilize: only re-run when serialized content changes
  const serialized = JSON.stringify(articles);
  const prevSerialized = useRef(serialized);
  const scriptRefs = useRef<HTMLScriptElement[]>([]);

  useEffect(() => {
    // Clean up previous scripts
    scriptRefs.current.forEach(script => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    });
    scriptRefs.current = [];

    const parsed: ArticleSchemaData[] = JSON.parse(serialized);

    parsed.forEach((article, index) => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.headline,
        "description": article.description,
        "image": article.image,
        "datePublished": article.datePublished,
        "dateModified": article.dateModified || article.datePublished,
        "author": {
          "@type": "Person",
          "name": article.author
        },
        "publisher": {
          "@type": "Organization",
          "name": article.publisher,
          "logo": {
            "@type": "ImageObject",
            "url": "https://storage.googleapis.com/gpt-engineer-file-uploads/SWwdRfTou4NwpSgFbdofc5xLsAp1/uploads/1763629516807-accent1.png"
          }
        },
        "keywords": article.keywords.join(", "),
        "articleSection": article.articleSection || "Lifestyle",
        "wordCount": article.wordCount || 1000,
        "url": article.url || "https://bargn.app/blog",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": article.url || "https://bargn.app/blog"
        },
        "inLanguage": "en-US"
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `article-schema-${index}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      scriptRefs.current.push(script);
    });

    return () => {
      scriptRefs.current.forEach(script => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      });
      scriptRefs.current = [];
    };
  }, [serialized]);
};
