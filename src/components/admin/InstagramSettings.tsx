import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Instagram, CheckCircle, AlertTriangle, ExternalLink, Eye, EyeOff } from "lucide-react";

interface SocialAccount {
  id: string;
  platform: string;
  account_id: string;
  account_name: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

const InstagramSettings = () => {
  const [account, setAccount] = useState<SocialAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showToken, setShowToken] = useState(false);

  // Form state
  const [accessToken, setAccessToken] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const fetchAccount = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("social_accounts" as any)
      .select("id, platform, account_id, account_name, expires_at, created_at, updated_at")
      .eq("platform", "instagram")
      .single();

    if (!error && data) {
      setAccount(data as unknown as SocialAccount);
      setAccountId((data as any).account_id || "");
      setAccountName((data as any).account_name || "");
      setExpiresAt(
        (data as any).expires_at
          ? new Date((data as any).expires_at).toISOString().split("T")[0]
          : ""
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const saveAccount = async () => {
    if (!accessToken && !account) {
      toast.error("Access Token on pakollinen");
      return;
    }
    if (!accountId.trim()) {
      toast.error("Instagram Account ID on pakollinen");
      return;
    }

    setSaving(true);
    try {
      const payload: any = {
        platform: "instagram",
        account_id: accountId.trim(),
        account_name: accountName.trim() || null,
        expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
        updated_at: new Date().toISOString(),
      };

      // Only include access_token if a new one was entered
      if (accessToken.trim()) {
        payload.access_token = accessToken.trim();
      }

      let error;

      if (account) {
        // Update existing
        ({ error } = await supabase
          .from("social_accounts" as any)
          .update(payload as any)
          .eq("id", account.id));
      } else {
        // Insert new — access_token required
        payload.access_token = accessToken.trim();
        ({ error } = await supabase
          .from("social_accounts" as any)
          .insert(payload as any));
      }

      if (error) throw error;

      toast.success("Instagram-asetukset tallennettu!");
      setAccessToken("");
      setShowToken(false);
      fetchAccount();
    } catch (e: any) {
      console.error("Save error:", e);
      toast.error(e.message || "Tallennus epäonnistui");
    } finally {
      setSaving(false);
    }
  };

  const deleteAccount = async () => {
    if (!account) return;
    if (!confirm("Haluatko varmasti poistaa Instagram-tunnistetiedot?")) return;

    const { error } = await supabase
      .from("social_accounts" as any)
      .delete()
      .eq("id", account.id);

    if (!error) {
      toast.success("Instagram-tili poistettu");
      setAccount(null);
      setAccountId("");
      setAccountName("");
      setExpiresAt("");
    } else {
      toast.error("Poisto epäonnistui");
    }
  };

  const isExpiringSoon = account?.expires_at
    ? new Date(account.expires_at).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000
    : false;

  const isExpired = account?.expires_at
    ? new Date(account.expires_at) < new Date()
    : false;

  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="py-8 text-center text-muted-foreground">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Status card */}
      {account && (
      <Card className={`border-2 ${isExpired ? "border-destructive/50 bg-destructive/5" : isExpiringSoon ? "border-yellow-500/50 bg-yellow-500/5" : "border-primary/30 bg-primary/5"}`}>
          <CardContent className="p-4 flex items-start gap-3">
            {isExpired ? (
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            ) : isExpiringSoon ? (
              <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-foreground text-sm">
                  {account.account_name || `ID: ${account.account_id}`}
                </p>
                <Badge className={isExpired ? "bg-destructive/20 text-destructive" : isExpiringSoon ? "bg-yellow-500/20 text-yellow-600" : "bg-primary/20 text-primary"}>
                  {isExpired ? "Token vanhentunut" : isExpiringSoon ? "Vanhenee pian" : "Yhdistetty"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Account ID: <span className="font-mono">{account.account_id}</span>
              </p>
              {account.expires_at && (
                <p className="text-xs text-muted-foreground">
                  Token vanhenee: {new Date(account.expires_at).toLocaleDateString("fi")}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Päivitetty: {new Date(account.updated_at).toLocaleDateString("fi")}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings form */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2 text-base">
            <Instagram className="w-5 h-5 text-primary" />
            {account ? "Päivitä Instagram-tunnistetiedot" : "Yhdistä Instagram-tili"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Instructions */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Ohjeet tokenin hankkimiseen:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Mene osoitteeseen <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary underline inline-flex items-center gap-1">developers.facebook.com <ExternalLink className="w-3 h-3" /></a></li>
              <li>Luo App → valitse <strong>Business</strong>-tyyppi</li>
              <li>Lisää <strong>Instagram Graph API</strong> -tuote</li>
              <li>Hanki <strong>Long-lived Access Token</strong> (kestää 60 päivää)</li>
              <li>Hanki <strong>Instagram Business Account ID</strong> Graph API Explorerista</li>
            </ol>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground">
                Access Token {account && <span className="text-muted-foreground font-normal">(jätä tyhjäksi jos ei muutu)</span>}
              </label>
              <div className="relative mt-1">
                <Input
                  type={showToken ? "text" : "password"}
                  placeholder={account ? "Syötä uusi token päivittääksesi..." : "EAAxxxxx..."}
                  value={accessToken}
                  onChange={e => setAccessToken(e.target.value)}
                  className="bg-background border-border text-foreground pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Instagram Business Account ID *</label>
              <Input
                placeholder="17841400000000000"
                value={accountId}
                onChange={e => setAccountId(e.target.value)}
                className="bg-background border-border text-foreground mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Tilin nimi (valinnainen)</label>
              <Input
                placeholder="@bargn.fi"
                value={accountName}
                onChange={e => setAccountName(e.target.value)}
                className="bg-background border-border text-foreground mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Token vanhenee (valinnainen)</label>
              <Input
                type="date"
                value={expiresAt}
                onChange={e => setExpiresAt(e.target.value)}
                className="bg-background border-border text-foreground mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">Long-lived token kestää 60 päivää. Aseta muistutuspäivä.</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={saveAccount} disabled={saving} className="flex-1">
              {saving ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Instagram className="w-4 h-4 mr-2" />
              )}
              {account ? "Päivitä asetukset" : "Tallenna ja yhdistä"}
            </Button>
            {account && (
              <Button variant="outline" onClick={deleteAccount} className="text-destructive hover:text-destructive">
                Poista tili
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstagramSettings;
