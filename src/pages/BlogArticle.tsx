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
import { getBlogImageUrl } from "@/utils/generateBlogImages";

const articleData: Record<string, {
  titleKey: string;
  excerptKey: string;
  categoryKey: string;
  contentKeys: string[];
  readTime: string;
  gradient: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  keywords: string[];
  wordCount: number;
}> = {
  "how-sarah-saved": {
    titleKey: "blog.article1.title",
    excerptKey: "blog.article1.excerpt",
    categoryKey: "blog.article1.category",
    contentKeys: ["blog.article1.content.intro", "blog.article1.content.body", "blog.article1.content.conclusion"],
    readTime: "6 min",
    gradient: "from-[#E94B96] to-[#FF9B7D]",
    imageUrl: "article-success-story.png",
    datePublished: "2024-01-15T09:00:00+00:00",
    dateModified: "2024-01-20T14:30:00+00:00",
    keywords: ["student savings", "discount apps", "Finland", "money saving tips", "Gen Z finance"],
    wordCount: 1200,
  },
  "coupon-apps-scam": {
    titleKey: "blog.article2.title",
    excerptKey: "blog.article2.excerpt",
    categoryKey: "blog.article2.category",
    contentKeys: ["blog.article2.content.intro", "blog.article2.content.body", "blog.article2.content.conclusion"],
    readTime: "8 min",
    gradient: "from-[#FF9B7D] to-[#FFE500]",
    imageUrl: "article-coupon-apps.png",
    datePublished: "2024-01-10T10:00:00+00:00",
    dateModified: "2024-01-18T11:00:00+00:00",
    keywords: ["discount apps", "coupon comparison", "savings guide", "Helsinki deals", "best discount app"],
    wordCount: 1500,
  },
  "new-partners": {
    titleKey: "blog.article3.title",
    excerptKey: "blog.article3.excerpt",
    categoryKey: "blog.article3.category",
    contentKeys: ["blog.article3.content.intro", "blog.article3.content.body", "blog.article3.content.conclusion"],
    readTime: "4 min",
    gradient: "from-[#8B5CF6] to-[#FFE500]",
    imageUrl: "article-new-partners.png",
    datePublished: "2024-01-05T08:00:00+00:00",
    dateModified: "2024-01-22T16:00:00+00:00",
    keywords: ["new restaurants", "Helsinki food scene", "partner announcements", "restaurant discounts", "dining deals"],
    wordCount: 800,
  },
};

const BlogArticle = () => {
  useAnalytics();
  useBreadcrumbSchema();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const article = slug ? articleData[slug] : null;

  useArticleSchema(article ? [{
    headline: t(article.titleKey),
    description: t(article.excerptKey),
    image: getBlogImageUrl(article.imageUrl),
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: "Bargn Editorial Team",
    publisher: "Bargn",
    keywords: article.keywords,
    articleSection: t(article.categoryKey),
    wordCount: article.wordCount,
    url: `https://bargn.app/blog/${slug}`,
  }] : []);

  useMetaTags({
    title: article ? `${t(article.titleKey)} – Bargn Blog` : "Article Not Found – Bargn Blog",
    description: article ? t(article.excerptKey) : "Article not found.",
    ogTitle: article ? t(article.titleKey) : "Article Not Found",
    ogDescription: article ? t(article.excerptKey) : "",
  });

  if (!article) {
    return (
      <div className="min-h-screen bg-background-dark">
        <Navigation />
        <div className="pt-[132px] flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-4xl font-black text-white mb-4">{t("blog.articleNotFound")}</h1>
          <Button onClick={() => navigate("/blog")} className="bg-gradient-to-r from-[#E94B96] to-[#FF9B7D] text-white rounded-full px-8 py-6 font-bold">
            <ArrowLeft className="mr-2 w-5 h-5" />
            {t("blog.backToBlog")}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <Navigation />
      <div className="pt-[132px]">
        {/* Hero image */}
        <section className="relative">
          <div className={`w-full h-[40vh] md:h-[50vh] bg-gradient-to-br ${article.gradient} relative overflow-hidden`}>
            <img
              src={getBlogImageUrl(article.imageUrl)}
              alt={t(article.titleKey)}
              className="w-full h-full object-cover opacity-80"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
          </div>
        </section>

        {/* Article content */}
        <section className="relative -mt-20 z-10">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-glass backdrop-blur-xl border-2 border-glass rounded-3xl p-8 md:p-12"
            >
              {/* Back button */}
              <Button
                variant="ghost"
                onClick={() => navigate("/blog")}
                className="text-[#FF9B7D] hover:text-[#E94B96] font-bold mb-6 -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t("blog.backToBlog")}
              </Button>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-6 text-sm">
                <span className="text-[#FF9B7D] font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  {t(article.categoryKey)}
                </span>
                <span className="text-white/60 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
                {t(article.titleKey)}
              </h1>

              {/* Content */}
              <div className="prose prose-invert prose-lg max-w-none space-y-6">
                {article.contentKeys.map((key, i) => (
                  <p key={i} className="text-white/80 leading-relaxed text-lg">
                    {t(key)}
                  </p>
                ))}
              </div>

              {/* Share / CTA */}
              <div className="mt-12 pt-8 border-t border-glass flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: t(article.titleKey), url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="text-[#FF9B7D] hover:text-[#E94B96] font-bold"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {t("blog.share")}
                </Button>
                <Button
                  onClick={() => navigate("/blog")}
                  className="bg-gradient-to-r from-[#E94B96] to-[#FF9B7D] text-white rounded-full px-8 py-6 font-bold"
                >
                  {t("blog.moreArticles")}
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
