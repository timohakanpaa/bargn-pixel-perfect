import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogImageUploader from "@/components/blog/BlogImageUploader";
import { useLanguage } from "@/contexts/LanguageContext";
import { getBlogImageUrl } from "@/utils/generateBlogImages";
import { useState } from "react";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";

const BlogAdmin = () => {
  const { t } = useLanguage();
  useBreadcrumbSchema();
  const [refreshKey, setRefreshKey] = useState(0);

  const articles = [
    {
      id: "article-success-story",
      title: t("blog.article1.title"),
      filename: "article-success-story.png"
    },
    {
      id: "article-coupon-apps",
      title: t("blog.article2.title"),
      filename: "article-coupon-apps.png"
    },
    {
      id: "article-new-partners",
      title: t("blog.article3.title"),
      filename: "article-new-partners.png"
    }
  ];

  const handleImageUploaded = () => {
    // Refresh images
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background-dark">
      <Navigation />
      <div className="pt-[132px] pb-24">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-white text-center">
            <span className="bg-gradient-to-r from-[#E94B96] via-[#FF9B7D] to-[#FFE500] bg-clip-text text-transparent">
              Blog Image Management
            </span>
          </h1>
          <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
            Upload or generate images for your blog articles using AI
          </p>

          <div className="grid gap-12">
            {articles.map((article) => (
              <div key={article.id} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                    <div className="aspect-video bg-glass backdrop-blur-xl border-2 border-glass rounded-2xl overflow-hidden">
                      <img
                        key={refreshKey}
                        src={getBlogImageUrl(article.filename)}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e94b96'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='white'%3ENo Image%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <BlogImageUploader
                      articleId={article.id}
                      onImageUploaded={handleImageUploaded}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-glass backdrop-blur-xl border-2 border-glass rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-4">💡 Tips for Blog Images</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Images should be in landscape format (16:9 aspect ratio works best)</li>
              <li>• Maximum file size: 5MB</li>
              <li>• Supported formats: JPEG, PNG, WebP, GIF</li>
              <li>• For AI generation, be specific with your prompt for best results</li>
              <li>• Example prompts: "Modern digital illustration of money savings", "Vibrant photo of happy shoppers with discount tags"</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogAdmin;
