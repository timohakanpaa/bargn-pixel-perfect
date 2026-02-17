import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";
import MaterialBank from "@/components/admin/MaterialBank";
import { Card, CardContent, CardGlass } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Download, Sparkles, Instagram, ArrowRight, Lightbulb, Eye, Zap, TrendingUp, Trash2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface PublicMaterial {
  id: string;
  title: string;
  caption: string;
  platform: string;
  theme: string;
  image_url: string | null;
  created_at: string;
}

const CONTENT_IDEAS = [
  {
    icon: "🎬",
    title: "\"Testasin Bargn-sovellusta viikoksi\"",
    description: "Dokumentoi viikon ajan kaikki löytämäsi tarjoukset ja laske paljonko säästit. Näytä kuitteja ja reaktioita!",
    platform: "TikTok / Reels",
    hook: "POV: Säästit viikossa enemmän kuin sovellus maksaa koko vuodelta",
  },
  {
    icon: "🍕",
    title: "\"Syön päivän PUOLEEN HINTAAN\"",
    description: "Aamiainen, lounas ja illallinen – kaikki Bargn-tarjouksilla. Näytä ruoka ja hinnat!",
    platform: "TikTok / Reels",
    hook: "Päivän ruokabudjetti: normaalisti 45€, Bargnilla 22€ 🤯",
  },
  {
    icon: "💰",
    title: "\"Rahasäästöhaaste: 30 päivää Bargnilla\"",
    description: "Joka päivä yksi tarjous, laske kokonaissäästö kuukauden lopussa. Päivitä seuraajia matkan varrella!",
    platform: "Instagram Stories + TikTok",
    hook: "Kuukauden säästöhaaste alkaa NYT – tavoite: 200€ säästöä",
  },
  {
    icon: "🎯",
    title: "\"Treffi-ilta budjetilla\"",
    description: "Suunnittele täydellinen treffi-ilta Bargn-tarjouksilla: ravintola + aktiviteetti puoleen hintaan!",
    platform: "TikTok / Reels",
    hook: "Treffi-ilta 35€ vs normaalisti 70€ – kumpi kuulostaa paremmalta?",
  },
  {
    icon: "🏋️",
    title: "\"Treeniviikko eri saleilla\"",
    description: "Kokeile viikon ajan eri kuntosaleja ja studioita Bargn-tarjouksilla. Arvostele jokainen!",
    platform: "TikTok / YouTube Shorts",
    hook: "Treenaan viikon eri saleilla – maksan vain puolet 💪",
  },
  {
    icon: "🧖‍♀️",
    title: "\"Self-care Sunday budjetilla\"",
    description: "Kylpylä, hieronta tai kauneushoito – näytä miten hemmottelet itseäsi puoleen hintaan!",
    platform: "Instagram Reels / Stories",
    hook: "100€ spa-päivä hintaan 50€? Kyllä kiitos ✨",
  },
];

const SNEAK_PEEKS = [
  { emoji: "🔥", text: "Uusia ravintolakumppaneita tulossa tammikuussa 2026", tag: "Tulossa pian" },
  { emoji: "🎮", text: "Pelimaailmat ja VR-kokemukset liittymässä tarjontaan", tag: "Uusi kategoria" },
  { emoji: "🌍", text: "Bargn laajenee Tampereelle ja Turkuun Q2/2026", tag: "Laajentuminen" },
  { emoji: "🎁", text: "Eksklusiiviset influencer-tarjouskoodit kumppaneille", tag: "Tulossa" },
  { emoji: "💎", text: "Premium-jäsenyys: vielä isommat alennukset ja early access", tag: "Kehitteillä" },
];

const Materials = () => {
  const { loading, user } = useAuth(false);
  const [materials, setMaterials] = useState<PublicMaterial[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<"gallery" | "ideas" | "sneak">("gallery");
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      const { data } = await supabase
        .from("content_materials" as any)
        .select("id, title, caption, platform, theme, image_url, created_at")
        .eq("status", "published")
        .order("created_at", { ascending: false });
      if (data) setMaterials(data as unknown as PublicMaterial[]);
    };
    fetchMaterials();
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    };
    checkAdmin();
  }, [user]);

  const copyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption);
    toast.success("Teksti kopioitu leikepöydälle!");
  };

  const downloadImage = async (url: string, title: string) => {
    try {
      toast.info("Ladataan kuvaa...");
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${title.replace(/[^a-zA-Z0-9äöåÄÖÅ\s-]/g, "").replace(/\s+/g, "-").toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      toast.success("Kuva ladattu!");
    } catch {
      toast.error("Kuvan lataus epäonnistui");
    }
  };

  const deleteMaterial = async (id: string) => {
    const { error } = await supabase
      .from("content_materials" as any)
      .delete()
      .eq("id", id);
    if (!error) {
      setMaterials(prev => prev.filter(m => m.id !== id));
      toast.success("Materiaali poistettu");
    } else {
      toast.error("Poisto epäonnistui");
    }
  };

  const refreshMaterials = async () => {
    const { data } = await supabase
      .from("content_materials" as any)
      .select("id, title, caption, platform, theme, image_url, created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    if (data) setMaterials(data as unknown as PublicMaterial[]);
  };

  const regenerateImage = async (material: PublicMaterial) => {
    setRegeneratingId(material.id);
    try {
      const { data, error } = await supabase.functions.invoke("generate-content-material", {
        body: {
          theme: material.theme,
          platform: material.platform,
          imageStyle: "shot on iPhone, natural lighting, authentic UGC feel, real person perspective",
          regenerateImageForId: material.id,
        },
      });
      if (error) throw error;
      toast.success("Kuva generoitu uudelleen!");
      refreshMaterials();
    } catch (e: any) {
      console.error("Regenerate image error:", e);
      toast.error(e.message || "Kuvan generointi epäonnistui");
    } finally {
      setRegeneratingId(null);
    }
  };

  const platformIcon = (p: string) => {
    switch (p) {
      case "tiktok": return "🎵";
      case "instagram": return "📸";
      default: return "📱";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-[132px] pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-4 text-sm">
              <Sparkles className="w-3 h-3 mr-1" /> Kumppaneiden materiaalipankki
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-4 text-foreground">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Materiaalit & Inspiraatio
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Valmiit sometekstit, sisältöideat ja sneak peekit – kaikki mitä tarvitset Bargnin markkinointiin 🚀
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {[
              { key: "gallery" as const, icon: <Instagram className="w-4 h-4" />, label: "Somesisällöt" },
              { key: "ideas" as const, icon: <Lightbulb className="w-4 h-4" />, label: "Sisältöideat" },
              { key: "sneak" as const, icon: <Eye className="w-4 h-4" />, label: "Sneak Peeks" },
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "default" : "outline"}
                onClick={() => setActiveTab(tab.key)}
                className={`gap-2 ${activeTab === tab.key ? "shadow-lg shadow-primary/30" : ""}`}
              >
                {tab.icon} {tab.label}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Gallery Tab */}
            {activeTab === "gallery" && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { icon: <Zap className="w-5 h-5 text-accent" />, value: materials.length.toString(), label: "Valmiita postauksia" },
                    { icon: <Instagram className="w-5 h-5 text-secondary" />, value: materials.filter(m => m.platform === "instagram" || m.platform === "both").length.toString(), label: "Instagram" },
                    { icon: <span className="text-lg">🎵</span>, value: materials.filter(m => m.platform === "tiktok" || m.platform === "both").length.toString(), label: "TikTok" },
                    { icon: <TrendingUp className="w-5 h-5 text-primary" />, value: `${CONTENT_IDEAS.length}`, label: "Sisältöideaa" },
                  ].map((stat, i) => (
                    <CardGlass key={i} className="p-4 text-center">
                      <div className="flex justify-center mb-1">{stat.icon}</div>
                      <p className="text-2xl font-black text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </CardGlass>
                  ))}
                </div>

                {materials.length === 0 ? (
                  <CardGlass className="p-12 text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary opacity-50" />
                    <p className="text-muted-foreground text-lg">Sisältöjä ladataan pian – pysy kuulolla! 🚀</p>
                  </CardGlass>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {materials.map((material, index) => (
                      <motion.div
                        key={material.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <CardGlass className="overflow-hidden group hover:border-primary/40 transition-all duration-300">
                          {material.image_url ? (
                            <div className="aspect-square relative overflow-hidden">
                              <img
                                src={material.image_url}
                                alt={material.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              {isAdmin && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    regenerateImage(material);
                                  }}
                                  disabled={regeneratingId === material.id}
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-primary/20 hover:border-primary/40 z-10"
                                >
                                  <RefreshCw className={`w-3 h-3 mr-1 ${regeneratingId === material.id ? "animate-spin" : ""}`} />
                                  {regeneratingId === material.id ? "..." : "Uusi kuva"}
                                </Button>
                              )}
                            </div>
                          ) : (
                            <div className="aspect-video bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center relative">
                              <div className="text-center p-6">
                                <span className="text-4xl mb-2 block">{platformIcon(material.platform)}</span>
                                <p className="text-sm font-bold text-foreground">{material.title}</p>
                              </div>
                              {isAdmin && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    regenerateImage(material);
                                  }}
                                  disabled={regeneratingId === material.id}
                                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-primary/20 hover:border-primary/40"
                                >
                                  <RefreshCw className={`w-3 h-3 mr-1 ${regeneratingId === material.id ? "animate-spin" : ""}`} />
                                  {regeneratingId === material.id ? "..." : "Luo kuva"}
                                </Button>
                              )}
                            </div>
                          )}
                          <CardContent className="p-5 space-y-3">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                                {platformIcon(material.platform)} {material.platform}
                              </Badge>
                              <Badge className="bg-muted text-muted-foreground text-xs">
                                {material.theme}
                              </Badge>
                            </div>
                            <h3 className="font-bold text-foreground">{material.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-4 whitespace-pre-wrap leading-relaxed">
                              {material.caption}
                            </p>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyCaption(material.caption)}
                                className="flex-1 hover:bg-primary/10 hover:border-primary/40 transition-colors"
                              >
                                <Copy className="w-3 h-3 mr-2" /> Kopioi teksti
                              </Button>
                              {material.image_url && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => downloadImage(material.image_url!, material.title)}
                                  className="hover:bg-accent/10 hover:border-accent/40 transition-colors"
                                  title="Lataa kuva"
                                >
                                  <Download className="w-3 h-3" />
                                </Button>
                              )}
                              {isAdmin && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    if (confirm("Poistetaanko tämä materiaali?")) {
                                      deleteMaterial(material.id);
                                    }
                                  }}
                                  className="hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </CardGlass>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Ideas Tab */}
            {activeTab === "ideas" && (
              <motion.div
                key="ideas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-black text-foreground mb-2">Sisältöideat influenssereille</h2>
                  <p className="text-muted-foreground">Kokeile näitä formaatteja – ne toimivat! 🎯</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {CONTENT_IDEAS.map((idea, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <CardGlass className="p-6 hover:border-primary/40 transition-all duration-300 h-full">
                        <div className="flex items-start gap-4">
                          <span className="text-3xl flex-shrink-0">{idea.icon}</span>
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-foreground text-lg">{idea.title}</h3>
                              <Badge className="bg-secondary/20 text-secondary border-secondary/30 text-xs">
                                {idea.platform}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{idea.description}</p>
                            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mt-3">
                              <p className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">Hook-idea:</p>
                              <p className="text-sm text-foreground font-medium italic">"{idea.hook}"</p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyCaption(`${idea.title}\n\n${idea.description}\n\nHook: ${idea.hook}`)}
                              className="mt-2 text-muted-foreground hover:text-foreground"
                            >
                              <Copy className="w-3 h-3 mr-1" /> Kopioi idea
                            </Button>
                          </div>
                        </div>
                      </CardGlass>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Sneak Peeks Tab */}
            {activeTab === "sneak" && (
              <motion.div
                key="sneak"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-black text-foreground mb-2">Sneak Peeks 👀</h2>
                  <p className="text-muted-foreground">Eksklusiivista sisäpiirin tietoa – jaa seuraajillesi!</p>
                </div>
                <div className="max-w-2xl mx-auto space-y-4">
                  {SNEAK_PEEKS.map((peek, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <CardGlass className="p-5 hover:border-accent/40 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl flex-shrink-0">{peek.emoji}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">{peek.tag}</Badge>
                            </div>
                            <p className="text-foreground font-medium">{peek.text}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        </div>
                      </CardGlass>
                    </motion.div>
                  ))}
                </div>

                {/* CTA for influencers */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="max-w-lg mx-auto mt-10"
                >
                  <CardGlass className="p-8 text-center border-primary/30">
                    <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="text-xl font-black text-foreground mb-2">Haluatko yhteistyöhön?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ota yhteyttä ja aloita Bargn-kumppanuus – saat eksklusiiviset tarjouskoodit ja materiaalit!
                    </p>
                    <Button
                      className="shadow-lg shadow-primary/30"
                      onClick={() => window.location.href = "/partners"}
                    >
                      Liity kumppaniksi <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardGlass>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Admin section - only visible to admins */}
          {isAdmin && (
            <div className="mt-16 pt-8 border-t border-border">
              <Badge className="bg-destructive/20 text-destructive border-destructive/30 mb-4">
                Admin-työkalut
              </Badge>
              <MaterialBank />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Materials;
