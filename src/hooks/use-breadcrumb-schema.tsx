import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface BreadcrumbItem {
  name: string;
  path: string;
}

const routeMap: Record<string, BreadcrumbItem[]> = {
  "/": [
    { name: "Home", path: "/" }
  ],
  "/members": [
    { name: "Home", path: "/" },
    { name: "Members", path: "/members" }
  ],
  "/campaign": [
    { name: "Home", path: "/" },
    { name: "Creator Campaign", path: "/campaign" }
  ],
  "/partners": [
    { name: "Home", path: "/" },
    { name: "Partners", path: "/partners" }
  ],
  "/about": [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" }
  ],
  "/how-it-works": [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" }
  ],
  "/blog": [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" }
  ],
  "/terms": [
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" }
  ],
  "/privacy": [
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" }
  ],
  "/cookies": [
    { name: "Home", path: "/" },
    { name: "Cookie Policy", path: "/cookies" }
  ],
  "/analytics": [
    { name: "Home", path: "/" },
    { name: "Analytics", path: "/analytics" }
  ],
  "/chat-analytics": [
    { name: "Home", path: "/" },
    { name: "Chat Analytics", path: "/chat-analytics" }
  ],
  "/funnels": [
    { name: "Home", path: "/" },
    { name: "Funnels", path: "/funnels" }
  ],
  "/blog-admin": [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Admin", path: "/blog-admin" }
  ]
};

export const useBreadcrumbSchema = () => {
  const location = useLocation();
  
  useEffect(() => {
    const breadcrumbItems = routeMap[location.pathname] || [{ name: "Home", path: "/" }];
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `https://bargn.fi${item.path}`
      }))
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'breadcrumb-schema';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    
    return () => {
      const existingScript = document.getElementById('breadcrumb-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [location.pathname]);
};
