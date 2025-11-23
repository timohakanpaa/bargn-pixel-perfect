import { useEffect } from "react";

interface MetaTagsProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

export const useMetaTags = ({
  title,
  description,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
}: MetaTagsProps) => {
  useEffect(() => {
    // Store original values
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOgDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');

    // Update title
    if (title) {
      document.title = title;
    }

    // Update meta tags
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    if (ogTitle) {
      const metaOgTitle = document.querySelector('meta[property="og:title"]');
      if (metaOgTitle) {
        metaOgTitle.setAttribute('content', ogTitle);
      }
    }

    if (ogDescription) {
      const metaOgDescription = document.querySelector('meta[property="og:description"]');
      if (metaOgDescription) {
        metaOgDescription.setAttribute('content', ogDescription);
      }
    }

    if (twitterTitle) {
      const metaTwitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (metaTwitterTitle) {
        metaTwitterTitle.setAttribute('content', twitterTitle);
      }
    }

    if (twitterDescription) {
      const metaTwitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (metaTwitterDescription) {
        metaTwitterDescription.setAttribute('content', twitterDescription);
      }
    }

    // Cleanup: restore original values
    return () => {
      document.title = originalTitle;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && originalDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }

      const metaOgTitle = document.querySelector('meta[property="og:title"]');
      if (metaOgTitle && originalOgTitle) {
        metaOgTitle.setAttribute('content', originalOgTitle);
      }

      const metaOgDescription = document.querySelector('meta[property="og:description"]');
      if (metaOgDescription && originalOgDescription) {
        metaOgDescription.setAttribute('content', originalOgDescription);
      }

      const metaTwitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (metaTwitterTitle && originalTwitterTitle) {
        metaTwitterTitle.setAttribute('content', originalTwitterTitle);
      }

      const metaTwitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (metaTwitterDescription && originalTwitterDescription) {
        metaTwitterDescription.setAttribute('content', originalTwitterDescription);
      }
    };
  }, [title, description, ogTitle, ogDescription, twitterTitle, twitterDescription]);
};
