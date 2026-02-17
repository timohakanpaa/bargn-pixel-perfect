import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Tag, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useParams, useNavigate } from "react-router-dom";
import { useAnalytics } from "@/hooks/use-analytics";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { useArticleSchema } from "@/hooks/use-article-schema";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

const BlogArticle = () => {
  useAnalytics();
  useBreadcrumbSchema();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchArticle = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (!error && data) {
        setArticle(data);
      }
      setLoading(false);
    };
    fetchArticle();
  }, [slug]);

  const title = article
    ? (language === "fi" ? article.title_fi : article.title_en) || article.title_fi || article.title_en
    : "";
  const content = article
    ? (language === "fi" ? article.content_fi : article.content_en) || article.content_fi || article.content_en
    : "";
  const excerpt = article
    ? (language === "fi" ? article.excerpt_fi : article.excerpt_en) || article.excerpt_fi || article.excerpt_en
    : "";

  useArticleSchema(article ? [{
    headline: title,
    description: excerpt,
    image: article.image_url || "",
    datePublished: article.published_at || article.created_at,
    dateModified: article.updated_at,
    author: article.author || "Bargn Editorial Team",
    publisher: "Bargn",
    keywords: article.keywords || [],
    articleSection: article.category || "Blog",
    wordCount: content.split(/\s+/).length,
    url: `https://bargn.app/blog/${slug}`,
  }] : []);

  useMetaTags({
    title: article ? `${title} – Bargn Blog` : "Article Not Found – Bargn Blog",
    description: article ? excerpt : "Article not found.",
    ogTitle: article ? title : "Article Not Found",
    ogDescription: article ? excerpt : "",
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-[132px] flex items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-[132px] flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-4xl font-black text-foreground mb-4">
            {language === "fi" ? "Artikkelia ei löytynyt" : "Article not found"}
          </h1>
          <Button onClick={() => navigate("/blog")} className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full px-8 py-6 font-bold">
            <ArrowLeft className="mr-2 w-5 h-5" />
            {language === "fi" ? "Takaisin blogiin" : "Back to Blog"}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const gradient = "from-primary to-secondary";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-[132px]">
        {/* Hero */}
        <section className="relative">
          <div className={`w-full h-[30vh] md:h-[40vh] bg-gradient-to-br ${gradient} relative overflow-hidden`}>
            {article.image_url && (
              <img
                src={article.image_url}
                alt={title}
                className="w-full h-full object-cover opacity-80"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </section>

        {/* Article content */}
        <section className="relative -mt-20 z-10">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12"
            >
              <Button
                variant="ghost"
                onClick={() => navigate("/blog")}
                className="text-primary hover:text-secondary font-bold mb-6 -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                {language === "fi" ? "Takaisin blogiin" : "Back to Blog"}
              </Button>

              <div className="flex items-center gap-4 mb-6 text-sm">
                {article.category && (
                  <span className="text-primary font-semibold uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {article.category}
                  </span>
                )}
                {article.keywords?.length > 0 && (
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {Math.ceil(content.split(/\s+/).length / 200)} min
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-foreground mb-8 leading-tight">
                {title}
              </h1>

              <div className="prose prose-lg max-w-none text-muted-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_strong]:text-foreground [&_a]:text-primary">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>

              <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="text-primary hover:text-secondary font-bold"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {language === "fi" ? "Jaa" : "Share"}
                </Button>
                <Button
                  onClick={() => navigate("/blog")}
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full px-8 py-6 font-bold"
                >
                  {language === "fi" ? "Lisää artikkeleita" : "More Articles"}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="py-16" />
        <Footer />
      </div>
    </div>
  );
};

export default BlogArticle;
