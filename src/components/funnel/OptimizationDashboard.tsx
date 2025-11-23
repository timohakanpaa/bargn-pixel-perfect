import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, TrendingUp, AlertCircle, Sparkles, RefreshCw } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Funnel {
  id: string;
  name: string;
}

interface AnalysisResult {
  funnel: {
    funnel_name: string;
    completion_rate: number;
    total_entries: number;
    completions: number;
  };
  recommendations: string;
  analyzed_at: string;
}

export const OptimizationDashboard = () => {
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [selectedFunnel, setSelectedFunnel] = useState<string>("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFunnels();
  }, []);

  const fetchFunnels = async () => {
    try {
      const { data, error } = await supabase
        .from('conversion_funnels')
        .select('id, name')
        .eq('is_active', true);

      if (error) throw error;

      setFunnels(data || []);
      if (data && data.length > 0) {
        setSelectedFunnel(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching funnels:', error);
    }
  };

  const analyzeWithAI = async () => {
    if (!selectedFunnel) {
      toast({
        title: "No funnel selected",
        description: "Please select a funnel to analyze",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-funnel', {
        body: { funnel_id: selectedFunnel }
      });

      if (error) {
        if (error.message?.includes('Rate limit')) {
          toast({
            title: "Rate limit exceeded",
            description: "Please wait a moment before requesting another analysis.",
            variant: "destructive"
          });
          return;
        }
        if (error.message?.includes('Payment required')) {
          toast({
            title: "Credits needed",
            description: "Please add credits to your Lovable workspace to continue.",
            variant: "destructive"
          });
          return;
        }
        throw error;
      }

      setAnalysis(data);
      toast({
        title: "Analysis complete",
        description: "AI-powered recommendations are ready",
      });
    } catch (error: any) {
      console.error('Error analyzing funnel:', error);
      toast({
        title: "Analysis failed",
        description: error.message || "Failed to generate recommendations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedFunnelName = funnels.find(f => f.id === selectedFunnel)?.name || "";

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI-Powered Optimization
              </CardTitle>
              <CardDescription>
                Get intelligent recommendations to improve your funnel conversion rates
              </CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Lightbulb className="h-3 w-3" />
              Powered by AI
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label>Select Funnel to Analyze</Label>
              <Select value={selectedFunnel} onValueChange={setSelectedFunnel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {funnels.map(funnel => (
                    <SelectItem key={funnel.id} value={funnel.id}>
                      {funnel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={analyzeWithAI}
                disabled={loading || !selectedFunnel}
                className="w-full md:w-auto"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Insights
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {!loading && analysis && (
        <>
          {/* Funnel Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {analysis.funnel.funnel_name} Performance
              </CardTitle>
              <CardDescription>
                Analysis based on last 30 days of data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <div className="text-sm text-muted-foreground mb-1">Conversion Rate</div>
                  <div className="text-3xl font-bold text-primary">
                    {analysis.funnel.completion_rate}%
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <div className="text-sm text-muted-foreground mb-1">Total Entries</div>
                  <div className="text-3xl font-bold">
                    {analysis.funnel.total_entries.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <div className="text-sm text-muted-foreground mb-1">Completions</div>
                  <div className="text-3xl font-bold text-primary">
                    {analysis.funnel.completions.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                AI Recommendations
              </CardTitle>
              <CardDescription>
                Data-driven insights to optimize your conversion funnel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h3>
                    ),
                    h2: ({ children }) => (
                      <h4 className="text-base font-semibold mt-3 mb-1 text-foreground">{children}</h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-sm text-foreground/90 mb-2">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-1 mb-3">{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li className="text-sm text-foreground/90">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">{children}</strong>
                    )
                  }}
                >
                  {analysis.recommendations}
                </ReactMarkdown>
              </div>
              
              <div className="mt-6 pt-4 border-t flex items-center gap-2 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3" />
                <span>
                  Analysis generated on {new Date(analysis.analyzed_at).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Empty State */}
      {!loading && !analysis && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ready to Optimize</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
              Select a funnel and click "Generate Insights" to receive AI-powered recommendations
              based on your drop-off patterns and cohort performance.
            </p>
            <Button onClick={analyzeWithAI} disabled={!selectedFunnel}>
              <Sparkles className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};