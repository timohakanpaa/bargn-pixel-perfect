import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Clock } from "lucide-react";

interface Lead {
  id: string;
  email: string;
  terms_accepted: boolean;
  created_at: string;
}

const CheckoutLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data } = await supabase
        .from("checkout_leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (data) setLeads(data);
      setLoading(false);
    };
    fetchLeads();
  }, []);

  if (loading) {
    return <div className="animate-pulse text-muted-foreground p-6">Ladataan...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          Checkout-liidit ({leads.length})
        </CardTitle>
        <CardDescription>Sähköpostit jotka on syötetty ennen Stripe-maksua</CardDescription>
      </CardHeader>
      <CardContent>
        {leads.length === 0 ? (
          <p className="text-sm text-muted-foreground">Ei vielä liidejä.</p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
              >
                <span className="text-foreground font-medium truncate mr-3">{lead.email}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3" />
                  {new Date(lead.created_at).toLocaleDateString("fi-FI")}{" "}
                  {new Date(lead.created_at).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckoutLeads;
