import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TrendingUp, Rocket, DollarSign, Clock, Tag, ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/use-in-view";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { getBlogImageUrl } from "@/utils/generateBlogImages";
import { useAnalytics } from "@/hooks/use-analytics";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";
import { useArticleSchema } from "@/hooks/use-article-schema";
import { useAuth } from "@/hooks/use-auth";

const Blog = () => {
  const { loading } = useAuth(true); // Require admin access
  useAnalytics(); // Auto-track page view
  useBreadcrumbSchema();
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [activeCategory, setActiveCategory] = useState("all");
  const { ref: heroRef, isInView: heroInView } = useInView();
  const { ref: postsRef, isInView: postsInView } = useInView();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    if (heroInView) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF9B7D', '#E94B96', '#FFE500']
      });
    }
  }, [heroInView]);

  // Show loading state while checking admin access
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const categories = [
    { id: "all", label: t("blog.categories.all") },
    { id: "guides", label: t("blog.categories.guides") },
    { id: "spotlights", label: t("blog.categories.spotlights") },
    { id: "stories", label: t("blog.categories.stories") }
  ];

  const articles = [
    {
      title: t("blog.article1.title"),
      excerpt: t("blog.article1.excerpt"),
      category: t("blog.article1.category"),
      readTime: "6 min",
      gradient: "from-[#E94B96] to-[#FF9B7D]",
      // Image will be loaded from storage or generated
      imageUrl: "article-success-story.png"
    },
    {
      title: t("blog.article2.title"),
      excerpt: t("blog.article2.excerpt"),
      category: t("blog.article2.category"),
      readTime: "8 min",
      gradient: "from-[#FF9B7D] to-[#FFE500]",
      imageUrl: "article-coupon-apps.png"
    },
    {
      title: t("blog.article3.title"),
      excerpt: t("blog.article3.excerpt"),
      category: t("blog.article3.category"),
      readTime: "4 min",
      gradient: "from-[#8B5CF6] to-[#FFE500]",
      imageUrl: "article-new-partners.png"
    }
  ];
  
  // Inject Article schema for SEO
  useArticleSchema([
    {
      headline: t("blog.article1.title"),
      description: t("blog.article1.excerpt"),
      image: getBlogImageUrl("article-success-story.png"),
      datePublished: "2024-01-15T09:00:00+00:00",
      dateModified: "2024-01-20T14:30:00+00:00",
      author: "Bargn Editorial Team",
      publisher: "Bargn",
      keywords: ["student savings", "discount apps", "Finland", "money saving tips", "Gen Z finance"],
      articleSection: "Success Stories",
      wordCount: 1200,
      url: "https://bargn.app/blog#success-story"
    },
    {
      headline: t("blog.article2.title"),
      description: t("blog.article2.excerpt"),
      image: getBlogImageUrl("article-coupon-apps.png"),
      datePublished: "2024-01-10T10:00:00+00:00",
      dateModified: "2024-01-18T11:00:00+00:00",
      author: "Bargn Editorial Team",
      publisher: "Bargn",
      keywords: ["discount apps", "coupon comparison", "savings guide", "Helsinki deals", "best discount app"],
      articleSection: "Guides",
      wordCount: 1500,
      url: "https://bargn.app/blog#discount-apps"
    },
    {
      headline: t("blog.article3.title"),
      description: t("blog.article3.excerpt"),
      image: getBlogImageUrl("article-new-partners.png"),
      datePublished: "2024-01-05T08:00:00+00:00",
      dateModified: "2024-01-22T16:00:00+00:00",
      author: "Bargn Editorial Team",
      publisher: "Bargn",
      keywords: ["new restaurants", "Helsinki food scene", "partner announcements", "restaurant discounts", "dining deals"],
      articleSection: "Partner Spotlights",
      wordCount: 800,
      url: "https://bargn.app/blog#new-partners"
    }
  ]);

  return (
    <div className="min-h-screen bg-background-dark">
      <Navigation />
      <div className="pt-[132px]">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
          {/* Solid dark background */}
          <div className="absolute inset-0 bg-background-dark"></div>
          
          {/* Giant gradient blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,_#E94B96_0%,_#FF9B7D_35%,_transparent_70%)] opacity-45 blur-[150px] rounded-full animate-pulse-glow"></div>
          
          {/* Floating icons */}
          <motion.div
            style={{ y: y1 }}
            animate={{ rotate: 360 }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
            className="absolute top-32 left-[10%] w-20 h-20 bg-gradient-to-br from-[#FFE500] to-[#E94B96] rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(255,229,0,0.6)] hover:scale-110 transition-transform"
          >
            <Sparkles className="w-10 h-10 text-[#0a0118]" />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            animate={{ rotate: -360 }}
            transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" } }}
            className="absolute top-40 right-[10%] w-16 h-16 bg-gradient-to-br from-[#E94B96] to-[#FF9B7D] rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(233,75,150,0.6)] hover:scale-110 transition-transform"
          >
            <TrendingUp className="w-8 h-8 text-white" />
          </motion.div>

          <motion.div
            style={{ y: y1 }}
            animate={{ rotate: 360 }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" } }}
            className="absolute bottom-40 left-[15%] w-14 h-14 bg-gradient-to-br from-[#FF9B7D] to-[#FFE500] rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(255,155,125,0.6)] hover:scale-110 transition-transform"
          >
            <Rocket className="w-7 h-7 text-[#0a0118]" />
          </motion.div>

          <div className={`container mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${heroInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-glass backdrop-blur-xl border-2 border-[#FFE500] rounded-full px-6 py-3 mb-8 shadow-[0_0_40px_rgba(255,229,0,0.6)]">
              <span className="text-[#FFE500] font-bold uppercase tracking-wider text-sm">
                ✨ {t('blog.hero.badge')} ✨
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-6xl md:text-8xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-[#E94B96] via-[#FF9B7D] to-[#FF9B7D] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(233,75,150,0.5)]">
                {t('blog.hero.headline')}
              </span>
            </h1>

            {/* Subheadline */}
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-[#FF9B7D] via-[#FF8C61] to-[#FF9B7D] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,155,125,0.5)]">
                {t('blog.hero.subheadline')}
              </span>
            </h2>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16 bg-background-dark relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="max-w-5xl mx-auto bg-glass backdrop-blur-xl border-2 border-glass rounded-3xl overflow-hidden hover:border-[#E94B96] hover:shadow-[0_0_40px_rgba(233,75,150,0.4)] transition-all duration-300"
            >
              <div className="md:flex">
                <div className="md:w-1/2 bg-gradient-to-br from-[#E94B96] via-[#FF9B7D] to-[#FFE500] p-12 flex items-center justify-center">
                  <div className="text-center">
                    <span className="inline-block bg-white/20 backdrop-blur-xl text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                      {t('blog.featured.tag')}
                    </span>
                    <DollarSign className="w-32 h-32 text-white mx-auto" />
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#FF9B7D] text-sm font-semibold uppercase tracking-wider flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {t('blog.article1.category')}
                    </span>
                    <span className="text-white/60 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {t('blog.featured.meta')}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                    {t('blog.featured.title')}
                  </h3>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {t("blog.article1.excerpt")}
                  </p>
                  <Button
                    onClick={() => {
                      confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#FF9B7D', '#E94B96', '#FFE500']
                      });
                    }}
                    className="bg-gradient-to-r from-[#E94B96] to-[#FF9B7D] text-white hover:shadow-[0_0_40px_rgba(233,75,150,0.6)] font-bold rounded-full px-8 py-6"
                  >
                    {t('blog.readFullStory')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-12 bg-background-dark relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveCategory(category.id);
                    confetti({
                      particleCount: 50,
                      spread: 60,
                      origin: { y: 0.6 },
                      colors: ['#FF9B7D', '#E94B96', '#FFE500']
                    });
                  }}
                  className={`px-8 py-4 rounded-full font-bold transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-[#E94B96] to-[#FF9B7D] text-white shadow-[0_0_40px_rgba(233,75,150,0.6)]'
                      : 'bg-glass backdrop-blur-xl border-2 border-glass text-white hover:border-[#E94B96]'
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <section ref={postsRef} className="py-24 bg-background-dark relative">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`bg-glass backdrop-blur-xl border-2 border-glass rounded-3xl overflow-hidden hover:border-[#E94B96] hover:shadow-[0_0_40px_rgba(233,75,150,0.4)] transition-all duration-300 ${postsInView ? 'animate-slide-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`h-48 bg-gradient-to-br ${article.gradient} flex items-center justify-center relative overflow-hidden group`}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <img 
                        src={getBlogImageUrl(article.imageUrl)}
                        alt={article.title}
                        width="400"
                        height="192"
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to gradient with icon if image fails to load
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className={`hidden w-full h-full bg-gradient-to-br ${article.gradient} items-center justify-center`}>
                        <DollarSign className="w-24 h-24 text-white opacity-80" />
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <span className="text-[#FF9B7D] font-semibold uppercase tracking-wider flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {article.category}
                      </span>
                      <span className="text-white/60 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white leading-tight">
                      {article.title}
                    </h3>
                    
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <Button
                      variant="ghost"
                      onClick={() => {
                        confetti({
                          particleCount: 50,
                          spread: 60,
                          origin: { y: 0.7 },
                          colors: ['#FF9B7D', '#E94B96', '#FFE500']
                        });
                      }}
                      className="text-[#FF9B7D] hover:text-[#E94B96] font-bold group"
                    >
                      {t('blog.readMore')}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Blog;
