import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Sparkles, Calendar, Edit, Trash2, Eye, Save, Settings, ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Article {
  id: string;
  slug: string;
  status: string;
  title_fi: string;
  title_en: string;
  content_fi: string;
  content_en: string;
  excerpt_fi: string;
  excerpt_en: string;
  keywords: string[];
  category: string;
  image_url: string;
  published_at: string | null;
  scheduled_at: string | null;
  created_at: string;
  updated_at: string;
}

interface PromptTemplate {
  id: string;
  name: string;
  prompt_template: string;
  is_default: boolean;
}

const BlogAdminDashboard = () => {
  const { loading } = useAuth(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [generating, setGenerating] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editLang, setEditLang] = useState<"fi" | "en">("fi");

  // Generate form
  const [genKeywords, setGenKeywords] = useState("");
  const [genLanguage, setGenLanguage] = useState("both");
  const [genTemplateId, setGenTemplateId] = useState("");
  const [genCustomPrompt, setGenCustomPrompt] = useState("");

  // Schedule form
  const [schedKeywords, setSchedKeywords] = useState("");
  const [schedLanguage, setSchedLanguage] = useState("both");
  const [schedTemplateId, setSchedTemplateId] = useState("");
  const [schedCron, setSchedCron] = useState("0 9 * * 1");

  // Template form
  const [newTplName, setNewTplName] = useState("");
  const [newTplPrompt, setNewTplPrompt] = useState("");

  useEffect(() => {
    if (!loading) {
      fetchArticles();
      fetchTemplates();
    }
  }, [loading]);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("blog_articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setArticles(data as Article[]);
  };

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from("blog_prompt_templates")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setTemplates(data as PromptTemplate[]);
      const def = data.find((t: PromptTemplate) => t.is_default);
      if (def) {
        setGenTemplateId(def.id);
        setSchedTemplateId(def.id);
      }
    }
  };

  const generateArticle = async () => {
    if (!genKeywords.trim()) {
      toast.error("Syötä avainsanat");
      return;
    }
    setGenerating(true);
    try {
      const selectedTemplate = templates.find(t => t.id === genTemplateId);
      const promptTemplate = genCustomPrompt || selectedTemplate?.prompt_template || undefined;

      const { data, error } = await supabase.functions.invoke("generate-blog-article", {
        body: {
          keywords: genKeywords.split(",").map(k => k.trim()),
          promptTemplate,
          language: genLanguage,
        },
      });
      if (error) throw error;
      toast.success("Artikkeli generoitu!");
      setGenKeywords("");
      setGenCustomPrompt("");
      fetchArticles();
    } catch (e: any) {
      toast.error(e.message || "Virhe generoinnissa");
    } finally {
      setGenerating(false);
    }
  };

  const updateArticle = async (article: Article) => {
    const { error } = await supabase
      .from("blog_articles")
      .update({
        title_fi: article.title_fi,
        title_en: article.title_en,
        content_fi: article.content_fi,
        content_en: article.content_en,
        excerpt_fi: article.excerpt_fi,
        excerpt_en: article.excerpt_en,
        status: article.status,
        scheduled_at: article.scheduled_at,
        published_at: article.status === "published" ? new Date().toISOString() : article.published_at,
        keywords: article.keywords,
        category: article.category,
      })
      .eq("id", article.id);
    if (error) {
      toast.error("Tallennus epäonnistui");
    } else {
      toast.success("Artikkeli tallennettu!");
      setEditingArticle(null);
      fetchArticles();
    }
  };

  const deleteArticle = async (id: string) => {
    const { error } = await supabase.from("blog_articles").delete().eq("id", id);
    if (!error) {
      toast.success("Artikkeli poistettu");
      fetchArticles();
    }
  };

  const saveTemplate = async () => {
    if (!newTplName || !newTplPrompt) {
      toast.error("Täytä kaikki kentät");
      return;
    }
    const { error } = await supabase.from("blog_prompt_templates").insert({
      name: newTplName,
      prompt_template: newTplPrompt,
    });
    if (!error) {
      toast.success("Template tallennettu!");
      setNewTplName("");
      setNewTplPrompt("");
      fetchTemplates();
    }
  };

  const deleteTemplate = async (id: string) => {
    const { error } = await supabase.from("blog_prompt_templates").delete().eq("id", id);
    if (!error) {
      toast.success("Template poistettu");
      fetchTemplates();
    }
  };

  const createSchedule = async () => {
    if (!schedKeywords.trim()) {
      toast.error("Syötä avainsanat");
      return;
    }
    const { error } = await supabase.from("blog_schedules").insert({
      keywords: schedKeywords.split(",").map(k => k.trim()),
      prompt_template_id: schedTemplateId || null,
      cron_expression: schedCron,
      language: schedLanguage,
    });
    if (!error) {
      toast.success("Ajastus luotu!");
      setSchedKeywords("");
    } else {
      toast.error("Ajastuksen luonti epäonnistui");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statusColor = (s: string) =>
    s === "published" ? "bg-green-500/20 text-green-400" :
    s === "scheduled" ? "bg-accent/20 text-accent" :
    "bg-muted text-muted-foreground";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-[132px] pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-5xl font-black mb-2 text-foreground text-center">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Blog Admin
            </span>
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Hallinnoi artikkeleita, automaatiota ja AI-sisällöntuotantoa
          </p>

          <Tabs defaultValue="articles" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-xl mx-auto bg-card border border-border">
              <TabsTrigger value="articles">Artikkelit</TabsTrigger>
              <TabsTrigger value="content">Sisällöntuotanto</TabsTrigger>
              <TabsTrigger value="templates">Promptit</TabsTrigger>
            </TabsList>

            {/* ARTICLES TAB */}
            <TabsContent value="articles" className="space-y-4">
              {articles.length === 0 ? (
                <Card className="bg-card border-border">
                  <CardContent className="py-12 text-center text-muted-foreground">
                    Ei artikkeleita vielä. Luo ensimmäinen AI Generointi -välilehdeltä!
                  </CardContent>
                </Card>
              ) : (
                articles.map(article => (
                  <Card key={article.id} className="bg-card border-border">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={statusColor(article.status)}>{article.status}</Badge>
                            {article.keywords?.map(k => (
                              <Badge key={k} variant="outline" className="text-xs border-border">{k}</Badge>
                            ))}
                          </div>
                          <h3 className="font-bold text-foreground truncate">{article.title_fi || article.title_en || "Ei otsikkoa"}</h3>
                          <p className="text-sm text-muted-foreground truncate">{article.excerpt_fi || article.excerpt_en}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(article.created_at).toLocaleDateString("fi")}
                          </p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`/blog/${article.slug}`, "_blank")}
                          >
                            <Eye className="w-4 h-4 mr-1" /> Avaa
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => { setEditingArticle({...article}); setEditLang("fi"); }}>
                                <Edit className="w-4 h-4 mr-1" /> Muokkaa
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
                              <DialogHeader>
                                <DialogTitle className="text-foreground">Muokkaa artikkelia</DialogTitle>
                              </DialogHeader>
                              {editingArticle && editingArticle.id === article.id && (
                                <div className="space-y-4">
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant={editLang === "fi" ? "default" : "outline"}
                                      onClick={() => setEditLang("fi")}
                                    >🇫🇮 Suomi</Button>
                                    <Button
                                      size="sm"
                                      variant={editLang === "en" ? "default" : "outline"}
                                      onClick={() => setEditLang("en")}
                                    >🇬🇧 English</Button>
                                  </div>

                                  <div>
                                    <label className="text-sm text-muted-foreground">Otsikko ({editLang})</label>
                                    <Input
                                      value={editLang === "fi" ? editingArticle.title_fi : editingArticle.title_en}
                                      onChange={e => setEditingArticle({
                                        ...editingArticle,
                                        [editLang === "fi" ? "title_fi" : "title_en"]: e.target.value
                                      })}
                                      className="bg-background border-border text-foreground"
                                    />
                                  </div>

                                  <div>
                                    <label className="text-sm text-muted-foreground">Tiivistelmä ({editLang})</label>
                                    <Input
                                      value={editLang === "fi" ? editingArticle.excerpt_fi : editingArticle.excerpt_en}
                                      onChange={e => setEditingArticle({
                                        ...editingArticle,
                                        [editLang === "fi" ? "excerpt_fi" : "excerpt_en"]: e.target.value
                                      })}
                                      className="bg-background border-border text-foreground"
                                    />
                                  </div>

                                  <div>
                                    <label className="text-sm text-muted-foreground">Sisältö ({editLang})</label>
                                    <Textarea
                                      rows={15}
                                      value={editLang === "fi" ? editingArticle.content_fi : editingArticle.content_en}
                                      onChange={e => setEditingArticle({
                                        ...editingArticle,
                                        [editLang === "fi" ? "content_fi" : "content_en"]: e.target.value
                                      })}
                                      className="bg-background border-border text-foreground font-mono text-sm"
                                    />
                                  </div>

                                  <div className="flex gap-4">
                                    <div className="flex-1">
                                      <label className="text-sm text-muted-foreground">Status</label>
                                      <Select
                                        value={editingArticle.status}
                                        onValueChange={v => setEditingArticle({ ...editingArticle, status: v })}
                                      >
                                        <SelectTrigger className="bg-background border-border text-foreground">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="draft">Draft</SelectItem>
                                          <SelectItem value="published">Published</SelectItem>
                                          <SelectItem value="scheduled">Scheduled</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    {editingArticle.status === "scheduled" && (
                                      <div className="flex-1">
                                        <label className="text-sm text-muted-foreground">Ajastusaika</label>
                                        <Input
                                          type="datetime-local"
                                          value={editingArticle.scheduled_at?.slice(0, 16) || ""}
                                          onChange={e => setEditingArticle({ ...editingArticle, scheduled_at: e.target.value })}
                                          className="bg-background border-border text-foreground"
                                        />
                                      </div>
                                    )}
                                  </div>

                                  <div>
                                    <label className="text-sm text-muted-foreground">Avainsanat (pilkulla eroteltu)</label>
                                    <Input
                                      value={editingArticle.keywords?.join(", ") || ""}
                                      onChange={e => setEditingArticle({
                                        ...editingArticle,
                                        keywords: e.target.value.split(",").map(k => k.trim())
                                      })}
                                      className="bg-background border-border text-foreground"
                                    />
                                  </div>

                                  <Button onClick={() => updateArticle(editingArticle)} className="w-full">
                                    <Save className="w-4 h-4 mr-2" /> Tallenna
                                  </Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              if (confirm("Haluatko varmasti poistaa artikkelin?")) deleteArticle(article.id);
                            }}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* CONTENT PRODUCTION TAB */}
            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* MANUAL / ONE-OFF */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" /> Manuaalinen generointi
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Luo yksittäinen artikkeli heti AI:n avulla</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Avainsanat (pilkulla eroteltu)</label>
                      <Input
                        placeholder="säästäminen, tarjoukset, alennuskoodit"
                        value={genKeywords}
                        onChange={e => setGenKeywords(e.target.value)}
                        className="bg-background border-border text-foreground"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-muted-foreground">Kieli</label>
                        <Select value={genLanguage} onValueChange={setGenLanguage}>
                          <SelectTrigger className="bg-background border-border text-foreground">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="both">🇫🇮🇬🇧 Molemmat</SelectItem>
                            <SelectItem value="fi">🇫🇮 Suomi</SelectItem>
                            <SelectItem value="en">🇬🇧 English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Prompt-pohja</label>
                        <Select value={genTemplateId} onValueChange={setGenTemplateId}>
                          <SelectTrigger className="bg-background border-border text-foreground">
                            <SelectValue placeholder="Valitse pohja" />
                          </SelectTrigger>
                          <SelectContent>
                            {templates.map(t => (
                              <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">Mukautettu prompt (valinnainen)</label>
                      <Textarea
                        placeholder="Kirjoita artikkeli aiheesta {{keywords}}..."
                        value={genCustomPrompt}
                        onChange={e => setGenCustomPrompt(e.target.value)}
                        rows={3}
                        className="bg-background border-border text-foreground"
                      />
                      <p className="text-xs text-muted-foreground mt-1">{"{{keywords}}"} = avainsanojen paikkamerkki</p>
                    </div>

                    <Button onClick={generateArticle} disabled={generating} className="w-full">
                      {generating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                          Generoidaan...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" /> Generoi artikkeli nyt
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* AUTOMATIC / SCHEDULED */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-accent" /> Automaattinen generointi
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Ajasta AI artikkelien automaattinen luonti</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Avainsanat</label>
                      <Input
                        placeholder="säästäminen, tarjoukset"
                        value={schedKeywords}
                        onChange={e => setSchedKeywords(e.target.value)}
                        className="bg-background border-border text-foreground"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-muted-foreground">Kieli</label>
                        <Select value={schedLanguage} onValueChange={setSchedLanguage}>
                          <SelectTrigger className="bg-background border-border text-foreground">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="both">🇫🇮🇬🇧 Molemmat</SelectItem>
                            <SelectItem value="fi">🇫🇮 Suomi</SelectItem>
                            <SelectItem value="en">🇬🇧 English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Prompt-pohja</label>
                        <Select value={schedTemplateId} onValueChange={setSchedTemplateId}>
                          <SelectTrigger className="bg-background border-border text-foreground">
                            <SelectValue placeholder="Valitse" />
                          </SelectTrigger>
                          <SelectContent>
                            {templates.map(t => (
                              <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">Aikataulu (Cron)</label>
                      <Select value={schedCron} onValueChange={setSchedCron}>
                        <SelectTrigger className="bg-background border-border text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0 9 * * 1">Joka maanantai klo 9</SelectItem>
                          <SelectItem value="0 9 * * 1,4">Ma & To klo 9</SelectItem>
                          <SelectItem value="0 9 * * *">Joka päivä klo 9</SelectItem>
                          <SelectItem value="0 9 1 * *">Kuun 1. päivä klo 9</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Nykyinen: <code className="bg-muted px-1 rounded text-xs">{schedCron}</code>
                      </p>
                    </div>

                    <Button onClick={createSchedule} className="w-full" variant="secondary">
                      <Calendar className="w-4 h-4 mr-2" /> Aktivoi automaattinen generointi
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>



            {/* TEMPLATES TAB */}
            <TabsContent value="templates" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Settings className="w-5 h-5 text-secondary" /> Prompt-pohjat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Nimi</label>
                    <Input
                      placeholder="SEO Blog Post"
                      value={newTplName}
                      onChange={e => setNewTplName(e.target.value)}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Prompt</label>
                    <Textarea
                      placeholder="Kirjoita SEO-optimoitu artikkeli aiheesta {{keywords}}..."
                      value={newTplPrompt}
                      onChange={e => setNewTplPrompt(e.target.value)}
                      rows={5}
                      className="bg-background border-border text-foreground"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{"{{keywords}}"} korvataan automaattisesti avainsanoilla</p>
                  </div>
                  <Button onClick={saveTemplate}>
                    <Plus className="w-4 h-4 mr-2" /> Lisää pohja
                  </Button>
                </CardContent>
              </Card>

              {templates.map(t => (
                <Card key={t.id} className="bg-card border-border">
                  <CardContent className="p-4 flex justify-between items-start gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-foreground">{t.name}</h4>
                        {t.is_default && <Badge className="bg-primary/20 text-primary">Oletus</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{t.prompt_template}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteTemplate(t.id)}
                      className="text-destructive hover:text-destructive shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogAdminDashboard;
