import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, TrendingUp, Tag, ArrowRight, Zap, Target, DollarSign, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/use-in-view";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

const Blog = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const { ref: postsRef, isInView: postsInView } = useInView({ threshold: 0.1 });
  
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    if (!hasTriggeredConfetti) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
        });
        setHasTriggeredConfetti(true);
      }, 800);
    }
  }, [hasTriggeredConfetti]);

  const blogPosts = [
    {
      title: "10 Places Where You're Overpaying (And How to Stop)",
      excerpt: "Spoiler: It's almost everywhere. But we've got the cheat codes to save 50% at each one.",
      category: "Savings Tips",
      date: "Nov 20, 2024",
      readTime: "5 min read",
      gradient: "from-[hsl(328,86%,70%)] to-[hsl(297,89%,60%)]",
      image: "🎯"
    },
    {
      title: "How Our AI Actually Works (Without the BS)",
      excerpt: "No cap, we're breaking down exactly how our AI finds you the best deals without being creepy.",
      category: "Technology",
      date: "Nov 18, 2024",
      readTime: "7 min read",
      gradient: "from-[hsl(297,89%,60%)] to-[hsl(25,95%,53%)]",
      image: "🤖"
    },
    {
      title: "Member Spotlight: How Sarah Saved €5,000 in 6 Months",
      excerpt: "Real member, real savings, real receipts. Sarah went from broke to woke using Bargn.",
      category: "Success Stories",
      date: "Nov 15, 2024",
      readTime: "6 min read",
      gradient: "from-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)]",
      image: "⭐"
    },
    {
      title: "Why Traditional Coupon Apps Are Scamming You",
      excerpt: "Hot take: Those 'deal' apps are making money off you while you think you're saving. Here's how.",
      category: "Industry Insights",
      date: "Nov 12, 2024",
      readTime: "8 min read",
      gradient: "from-[hsl(48,100%,50%)] to-[hsl(328,86%,70%)]",
      image: "💡"
    },
    {
      title: "The Psychology of Pricing: Why You Pay Too Much",
      excerpt: "Retailers use these mind tricks to make you spend more. Time to level up your game.",
      category: "Money Mindset",
      date: "Nov 10, 2024",
      readTime: "10 min read",
      gradient: "from-[hsl(328,86%,70%)] to-[hsl(25,95%,53%)]",
      image: "🧠"
    },
    {
      title: "50 Partners Just Joined – Here's Where",
      excerpt: "We're expanding faster than your ex moved on. Check out the new spots where you can save.",
      category: "Updates",
      date: "Nov 8, 2024",
      readTime: "4 min read",
      gradient: "from-[hsl(297,89%,60%)] to-[hsl(48,100%,50%)]",
      image: "🚀"
    }
  ];

  const categories = [
    { name: "All Posts", count: 42, icon: Sparkles },
    { name: "Savings Tips", count: 15, icon: DollarSign },
    { name: "Success Stories", count: 8, icon: TrendingUp },
    { name: "Technology", count: 6, icon: Zap },
    { name: "Updates", count: 13, icon: Target }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-[132px]">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pb-20">
          {/* Giant Gradient Blob */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-purple-yellow opacity-30 blur-[150px] rounded-full animate-pulse-glow"
          />
          
          {/* Floating Icons */}
          <motion.div
            style={{ y: y1 }}
            animate={{ rotate: 360, y: [0, -20, 0] }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 3, repeat: Infinity } }}
            className="absolute top-40 left-[10%] w-24 h-24 bg-glass backdrop-blur-2xl border-2 border-accent rounded-3xl flex items-center justify-center shadow-glow-yellow"
          >
            <Sparkles className="w-12 h-12 text-accent" />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            animate={{ rotate: -360, y: [0, 20, 0] }}
            transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity } }}
            className="absolute top-32 right-[10%] w-20 h-20 bg-glass backdrop-blur-2xl border-2 border-primary rounded-full flex items-center justify-center shadow-glow-coral"
          >
            <TrendingUp className="w-10 h-10 text-primary" />
          </motion.div>

          <motion.div
            style={{ y: y1 }}
            animate={{ rotate: 360, y: [0, -15, 0] }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 3.5, repeat: Infinity } }}
            className="absolute bottom-40 left-[15%] w-28 h-28 bg-glass backdrop-blur-2xl border-2 border-secondary rounded-2xl flex items-center justify-center shadow-glow-purple"
          >
            <Zap className="w-14 h-14 text-secondary" />
          </motion.div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="text-accent text-lg font-bold">✨ BARGN BLOG ✨</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-[hsl(328,86%,70%)] via-[hsl(297,89%,60%)] to-[hsl(48,100%,50%)] bg-clip-text text-transparent">
                Money Talks,
              </span>
              <br />
              <span className="bg-gradient-to-r from-[hsl(48,100%,50%)] via-[hsl(25,95%,53%)] to-[hsl(328,86%,70%)] bg-clip-text text-transparent">
                We Listen
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
            >
              Real talk about saving money, living better, and sticking it to overpriced everything.
            </motion.p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 border-y border-foreground/10">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {categories.map((category, index) => {
                const CategoryIcon = category.icon;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-full bg-glass backdrop-blur-xl border border-foreground/10 hover:border-foreground/30 transition-all flex items-center gap-2"
                  >
                    <CategoryIcon className="w-4 h-4 text-primary" />
                    <span className="font-medium">{category.name}</span>
                    <span className="text-muted-foreground text-sm">({category.count})</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section ref={postsRef} className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={postsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="group rounded-3xl overflow-hidden bg-gradient-to-b from-foreground/5 to-foreground/[0.02] border border-foreground/10 hover:border-foreground/20 transition-all"
                >
                  <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center text-8xl`}>
                    {post.image}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="group-hover:text-primary"
                        onClick={() => {
                          confetti({
                            particleCount: 50,
                            spread: 60,
                            origin: { y: 0.7 },
                            colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
                          });
                        }}
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={postsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center mt-16"
            >
              <Button 
                variant="neon" 
                size="lg" 
                className="rounded-full px-10"
                onClick={() => {
                  confetti({
                    particleCount: 100,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
                  });
                }}
              >
                Load More Posts
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 relative bg-gradient-to-b from-background to-background/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-foreground/10 to-foreground/5 border border-foreground/20"
            >
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
                Don't Miss the Sauce
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get weekly money-saving tips, partner updates, and exclusive deals straight to your inbox. 
                No spam, just savings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="flex-1 px-6 py-4 rounded-full bg-background border-2 border-foreground/10 focus:border-primary outline-none transition-colors"
                />
                <Button 
                  variant="neon" 
                  size="lg" 
                  className="rounded-full px-8"
                  onClick={() => {
                    confetti({
                      particleCount: 150,
                      spread: 100,
                      origin: { y: 0.6 },
                      colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
                    });
                  }}
                >
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Blog;