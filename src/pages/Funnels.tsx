import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Users, ChevronRight, Target } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAnalytics } from "@/hooks/use-analytics";
import { AlertConfigurations } from "@/components/funnel/AlertConfigurations";
import { AlertLogs } from "@/components/funnel/AlertLogs";
import { CohortAnalysis } from "@/components/funnel/CohortAnalysis";

interface FunnelData {
  funnel_id: string;
  funnel_name: string;
  steps: Array<{
    step_number: number;
    step_name: string;
    page_path?: string;
    event_type: string;
  }>;
  total_entries: number;
  completions: number;
  completion_rate: number;
}

interface DropOffData {
  step_number: number;
  step_name: string;
  sessions_reached: number;
  sessions_continued: number;
  drop_off_count: number;
  drop_off_rate: number;
}

const Funnels = () => {
  useAnalytics();
  
  const [funnels, setFunnels] = useState<FunnelData[]>([]);
  const [selectedFunnel, setSelectedFunnel] = useState<string | null>(null);
  const [dropOffData, setDropOffData] = useState<DropOffData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFunnels();
  }, []);

  useEffect(() => {
    if (selectedFunnel) {
      fetchDropOffData(selectedFunnel);
    }
  }, [selectedFunnel]);

  const fetchFunnels = async () => {
    try {
      const { data, error } = await supabase
        .from("funnel_analytics")
        .select("*");

      if (error) throw error;
      
      const funnelData = data as unknown as FunnelData[];
      setFunnels(funnelData);
      
      if (funnelData.length > 0 && !selectedFunnel) {
        setSelectedFunnel(funnelData[0].funnel_id);
      }
    } catch (error) {
      console.error("Error fetching funnels:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDropOffData = async (funnelId: string) => {
    try {
      const { data, error } = await supabase
        .rpc("get_funnel_dropoff", {
          funnel_id_param: funnelId,
          days_back: 30,
        });

      if (error) throw error;
      setDropOffData(data || []);
    } catch (error) {
      console.error("Error fetching drop-off data:", error);
    }
  };

  const selectedFunnelData = funnels.find(f => f.funnel_id === selectedFunnel);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Conversion Funnels</h1>
            <p className="text-muted-foreground">
              Track user journeys, identify drop-off points, and manage alerts
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {/* Funnel Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {funnels.map((funnel) => (
                  <Card
                    key={funnel.funnel_id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedFunnel === funnel.funnel_id
                        ? "ring-2 ring-primary"
                        : "hover:shadow-glow-purple"
                    }`}
                    onClick={() => setSelectedFunnel(funnel.funnel_id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{funnel.funnel_name}</CardTitle>
                      <CardDescription>{funnel.steps.length} steps</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Entries</span>
                          <span className="text-lg font-bold">{funnel.total_entries}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Completions</span>
                          <span className="text-lg font-bold">{funnel.completions}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Conversion Rate</span>
                          <span className="text-2xl font-bold text-primary">
                            {funnel.completion_rate || 0}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detailed Funnel Visualization */}
              {selectedFunnelData && (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedFunnelData.funnel_name} - Step Analysis</CardTitle>
                    <CardDescription>
                      Detailed breakdown of user progression through each funnel step
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {dropOffData.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No data available yet. Users will appear here as they progress through the funnel.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {dropOffData.map((step, index) => {
                          const prevStep = index > 0 ? dropOffData[index - 1] : null;
                          const conversionFromPrev = prevStep
                            ? ((step.sessions_reached / prevStep.sessions_reached) * 100).toFixed(1)
                            : 100;

                          return (
                            <div key={step.step_number} className="relative">
                              {index > 0 && (
                                <div className="absolute left-12 -top-3 flex items-center gap-2 text-sm">
                                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                  <span
                                    className={`font-semibold ${
                                      Number(conversionFromPrev) < 50
                                        ? "text-destructive"
                                        : Number(conversionFromPrev) < 75
                                        ? "text-accent"
                                        : "text-primary"
                                    }`}
                                  >
                                    {conversionFromPrev}% conversion
                                  </span>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-4 p-4 bg-glass border border-glass rounded-lg">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-purple-yellow flex items-center justify-center text-lg font-bold">
                                  {step.step_number}
                                </div>
                                
                                <div className="flex-1">
                                  <h4 className="font-semibold text-lg">{step.step_name}</h4>
                                  <div className="flex items-center gap-6 mt-2 text-sm">
                                    <div className="flex items-center gap-2">
                                      <Users className="w-4 h-4 text-muted-foreground" />
                                      <span className="font-medium">{step.sessions_reached}</span>
                                      <span className="text-muted-foreground">users</span>
                                    </div>
                                    
                                    {step.drop_off_count > 0 && (
                                      <div className="flex items-center gap-2 text-destructive">
                                        <TrendingDown className="w-4 h-4" />
                                        <span className="font-medium">{step.drop_off_count}</span>
                                        <span>dropped ({step.drop_off_rate}%)</span>
                                      </div>
                                    )}
                                    
                                    {step.sessions_continued > 0 && (
                                      <div className="flex items-center gap-2 text-primary">
                                        <TrendingUp className="w-4 h-4" />
                                        <span className="font-medium">{step.sessions_continued}</span>
                                        <span>continued</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex-shrink-0">
                                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-purple-yellow transition-all duration-500"
                                      style={{
                                        width: `${
                                          selectedFunnelData.total_entries > 0
                                            ? (step.sessions_reached / selectedFunnelData.total_entries) * 100
                                            : 0
                                        }%`,
                                      }}
                                    />
                                  </div>
                                  <p className="text-xs text-muted-foreground text-center mt-1">
                                    {selectedFunnelData.total_entries > 0
                                      ? ((step.sessions_reached / selectedFunnelData.total_entries) * 100).toFixed(1)
                                      : 0}
                                    % of total
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          )}
            </TabsContent>

            <TabsContent value="cohorts" className="space-y-6">
              <CohortAnalysis />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <AlertConfigurations />
              <AlertLogs />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Funnels;
