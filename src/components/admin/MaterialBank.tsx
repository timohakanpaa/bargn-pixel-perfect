import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Sparkles, Download, Trash2, Edit, Image, Copy, Instagram } from "lucide-react";

interface ContentMaterial {
  id: string;
  title: string;
  caption: string;
  platform: string;
  theme: string;
  image_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const THEMES = [
  { value: "ravintola-tarjoukset", label: "🍕 Ravintolatarjoukset" },
  { value: "aktiviteetit", label: "🎯 Aktiviteetit & elämykset" },
  { value: "hyvinvointi", label: "💆 Hyvinvointi & kauneus" },
  { value: "arjen-saastot", label: "💰 Arjen säästöt" },
  { value: "viikonloppu", label: "🎉 Viikonloppuvinkit" },
  { value: "uudet-kohteet", label: "🆕 Uudet kohteet" },
  { value: "kausiluonteiset", label: "🌸 Kausiluonteiset tarjoukset" },
  { value: "perhe", label: "👨‍👩‍👧‍👦 Perhe-edut" },
  { value: "opiskelijat", label: "🎓 Opiskelijaedut" },
  { value: "treffi-ideat", label: "❤️ Treffi-ideat" },
];

const MaterialBank = () => {
  const [materials, setMaterials] = useState<ContentMaterial[]>([]);
  const [generating, setGenerating] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [customTheme, setCustomTheme] = useState("");
  const [platform, setPlatform] = useState<string>("both");
  const [customPrompt, setCustomPrompt] = useState("");
  const [editingMaterial, setEditingMaterial] = useState<ContentMaterial | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const fetchMaterials = useCallback(async () => {
    const { data, error } = await supabase
      .from("content_materials" as any)
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setMaterials(data as unknown as ContentMaterial[]);
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const generateContent = async () => {
    const theme = customTheme || THEMES.find(t => t.value === selectedTheme)?.label?.replace(/^[^\s]+\s/, "") || "";
    if (!theme) {
      toast.error("Valitse tai kirjoita teema");
      return;
    }
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-content-material", {
        body: { theme, platform, customPrompt: customPrompt || undefined },
      });
      if (error) throw error;
      if (data?.imageError) {
        toast.warning("Sisältö luotu, mutta kuvan generointi epäonnistui");
      } else {
        toast.success("Sisältö generoitu onnistuneesti!");
      }
      fetchMaterials();
    } catch (e: any) {
      console.error("Generation error:", e);
      toast.error(e.message || "Virhe generoinnissa");
    } finally {
      setGenerating(false);
    }
  };

  const deleteMaterial = async (id: string) => {
    const { error } = await supabase
      .from("content_materials" as any)
      .delete()
      .eq("id", id);
    if (!error) {
      toast.success("Materiaali poistettu");
      fetchMaterials();
    }
  };

  const updateMaterial = async (material: ContentMaterial) => {
    const { error } = await supabase
      .from("content_materials" as any)
      .update({
        title: material.title,
        caption: material.caption,
        status: material.status,
        platform: material.platform,
      } as any)
      .eq("id", material.id);
    if (!error) {
      toast.success("Tallennettu!");
      setEditingMaterial(null);
      fetchMaterials();
    } else {
      toast.error("Tallennus epäonnistui");
    }
  };

  const copyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption);
    toast.success("Teksti kopioitu leikepöydälle!");
  };

  const downloadImage = async (url: string, title: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      toast.error("Lataus epäonnistui");
    }
  };

  const filteredMaterials = filter === "all"
    ? materials
    : materials.filter(m => m.platform === filter);

  const platformIcon = (p: string) => {
    switch (p) {
      case "tiktok": return "🎵";
      case "instagram": return "📸";
      default: return "📱";
    }
  };

  const statusColor = (s: string) =>
    s === "published" ? "bg-green-500/20 text-green-400" :
    s === "archived" ? "bg-muted text-muted-foreground" :
    "bg-accent/20 text-accent";

  return (
    <div className="space-y-6">
      {/* Generation Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Some-sisällön generointi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Teema (valitse)</label>
              <Select value={selectedTheme} onValueChange={(v) => { setSelectedTheme(v); setCustomTheme(""); }}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue placeholder="Valitse teema..." />
                </SelectTrigger>
                <SelectContent>
                  {THEMES.map(t => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Tai kirjoita oma teema</label>
              <Input
                placeholder="Esim: Kesän parhaat patiotarjoukset"
                value={customTheme}
                onChange={e => { setCustomTheme(e.target.value); setSelectedTheme(""); }}
                className="bg-background border-border text-foreground"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Alusta</label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="bg-background border-border text-foreground w-full md:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="both">📱 Molemmat (TikTok + Instagram)</SelectItem>
                <SelectItem value="tiktok">🎵 TikTok</SelectItem>
                <SelectItem value="instagram">📸 Instagram</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Mukautettu prompt (valinnainen)</label>
            <Textarea
              placeholder="Ohita oletusprompt omalla ohjeistuksellasi..."
              value={customPrompt}
              onChange={e => setCustomPrompt(e.target.value)}
              rows={3}
              className="bg-background border-border text-foreground"
            />
          </div>

          <Button onClick={generateContent} disabled={generating} className="w-full">
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                Generoidaan sisältöä ja kuvaa...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" /> Generoi sisältö + kuva
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Filter + Materials List */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-bold text-foreground">Materiaalit ({filteredMaterials.length})</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="bg-background border-border text-foreground w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Kaikki alustat</SelectItem>
            <SelectItem value="tiktok">🎵 TikTok</SelectItem>
            <SelectItem value="instagram">📸 Instagram</SelectItem>
            <SelectItem value="both">📱 Molemmat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredMaterials.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center text-muted-foreground">
            <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
            Ei materiaaleja vielä. Generoi ensimmäinen sisältö yllä!
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map(material => (
            <Card key={material.id} className="bg-card border-border overflow-hidden group">
              {material.image_url && (
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={material.image_url}
                    alt={material.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Badge className={statusColor(material.status)}>{material.status}</Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-background/80 text-foreground backdrop-blur-sm">
                      {platformIcon(material.platform)} {material.platform}
                    </Badge>
                  </div>
                </div>
              )}
              <CardContent className="p-4 space-y-3">
                <h3 className="font-bold text-foreground text-sm">{material.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-4 whitespace-pre-wrap">
                  {material.caption}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(material.created_at).toLocaleDateString("fi")} • {material.theme}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="outline" onClick={() => copyCaption(material.caption)}>
                    <Copy className="w-3 h-3 mr-1" /> Kopioi
                  </Button>
                  {material.image_url && (
                    <Button size="sm" variant="outline" onClick={() => downloadImage(material.image_url!, material.title)}>
                      <Download className="w-3 h-3 mr-1" /> Lataa
                    </Button>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => setEditingMaterial({ ...material })}>
                        <Edit className="w-3 h-3 mr-1" /> Muokkaa
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg bg-card border-border">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">Muokkaa materiaalia</DialogTitle>
                      </DialogHeader>
                      {editingMaterial && editingMaterial.id === material.id && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-muted-foreground">Otsikko</label>
                            <Input
                              value={editingMaterial.title}
                              onChange={e => setEditingMaterial({ ...editingMaterial, title: e.target.value })}
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">Teksti</label>
                            <Textarea
                              rows={6}
                              value={editingMaterial.caption}
                              onChange={e => setEditingMaterial({ ...editingMaterial, caption: e.target.value })}
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm text-muted-foreground">Alusta</label>
                              <Select
                                value={editingMaterial.platform}
                                onValueChange={v => setEditingMaterial({ ...editingMaterial, platform: v })}
                              >
                                <SelectTrigger className="bg-background border-border text-foreground">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="tiktok">TikTok</SelectItem>
                                  <SelectItem value="instagram">Instagram</SelectItem>
                                  <SelectItem value="both">Molemmat</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm text-muted-foreground">Status</label>
                              <Select
                                value={editingMaterial.status}
                                onValueChange={v => setEditingMaterial({ ...editingMaterial, status: v })}
                              >
                                <SelectTrigger className="bg-background border-border text-foreground">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="draft">Luonnos</SelectItem>
                                  <SelectItem value="published">Julkaistu</SelectItem>
                                  <SelectItem value="archived">Arkistoitu</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button onClick={() => updateMaterial(editingMaterial)} className="w-full">
                            Tallenna
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      if (confirm("Haluatko poistaa materiaalin?")) deleteMaterial(material.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaterialBank;
