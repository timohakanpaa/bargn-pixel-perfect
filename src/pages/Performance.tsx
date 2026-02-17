import { useEffect, useState, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminGuard from "@/components/AdminGuard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Activity, TrendingUp, Gauge, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface VitalSummary {
  metric_name: string;
  avg_value: number;
  p75_value: number;
  latest_rating: string;
  sample_count: number;
  good_count: number;
  poor_count: number;
}

interface VitalHistoryPoint {
  recorded_at: string;
  value: number;
  rating: string;
}

const METRIC_CONFIG = [
  { name: 'LCP', title: 'Largest Contentful Paint', description: 'Lataussuorituskyky', icon: Zap, unit: 'ms', good: '< 2.5s' },
  { name: 'INP', title: 'Interaction to Next Paint', description: 'Vuorovaikutus', icon: Activity, unit: 'ms', good: '< 200ms' },
  { name: 'CLS', title: 'Cumulative Layout Shift', description: 'Visuaalinen vakaus', icon: Gauge, unit: '', good: '< 0.1' },
  { name: 'FCP', title: 'First Contentful Paint', description: 'Ensimmäinen renderöinti', icon: TrendingUp, unit: 'ms', good: '< 1.8s' },
  { name: 'TTFB', title: 'Time to First Byte', description: 'Palvelimen vasteaika', icon: Clock, unit: 'ms', good: '< 800ms' },
];

const getRatingColor = (rating?: string) => {
  switch (rating) {
    case 'good': return 'text-green-500';
    case 'needs-improvement': return 'text-yellow-500';
    case 'poor': return 'text-red-500';
    default: return 'text-muted-foreground';
  }
};

const getRatingBg = (rating?: string) => {
  switch (rating) {
    case 'good': return 'bg-green-500/10';
    case 'needs-improvement': return 'bg-yellow-500/10';
    case 'poor': return 'bg-red-500/10';
    default: return 'bg-muted';
  }
};

const Performance = () => {
  const [summaries, setSummaries] = useState<VitalSummary[]>([]);
  const [historyData, setHistoryData] = useState<Record<string, VitalHistoryPoint[]>>({});
  const [daysBack, setDaysBack] = useState(7);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: summaryData } = await (supabase.rpc as any)('get_web_vitals_summary', { days_back: daysBack });
      setSummaries((summaryData as VitalSummary[]) || []);

      const historyPromises = METRIC_CONFIG.map(async (m) => {
        const { data } = await (supabase.rpc as any)('get_web_vitals_history', { p_metric_name: m.name, days_back: daysBack });
        return { name: m.name, data: (data as unknown as VitalHistoryPoint[]) || [] };
      });

      const results = await Promise.all(historyPromises);
      const histMap: Record<string, VitalHistoryPoint[]> = {};
      results.forEach(r => { histMap[r.name] = r.data; });
      setHistoryData(histMap);
    } catch (error) {
      console.error('Failed to fetch web vitals:', error);
    } finally {
      setLoading(false);
    }
  }, [daysBack]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const getSummary = (name: string) => summaries.find(s => s.metric_name === name);

  const getChartData = (name: string) => {
    const points = historyData[name] || [];
    return points.reverse().map(p => ({
      time: new Date(p.recorded_at).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' }),
      value: Math.round(p.value * 100) / 100,
      rating: p.rating,
    }));
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-[132px] pb-24">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-black mb-2 text-primary">
                  Performance Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Core Web Vitals — oikeiden käyttäjien mittaukset tietokannasta
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Select value={String(daysBack)} onValueChange={(v) => setDaysBack(Number(v))}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">24h</SelectItem>
                    <SelectItem value="7">7 päivää</SelectItem>
                    <SelectItem value="30">30 päivää</SelectItem>
                    <SelectItem value="90">90 päivää</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={fetchData} variant="outline" disabled={loading}>
                  {loading ? 'Ladataan...' : 'Päivitä'}
                </Button>
              </div>
            </div>

            {!loading && summaries.length === 0 ? (
              <Card className="border-2 border-dashed">
                <CardContent className="pt-12 pb-12 text-center">
                  <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-bold mb-2">Ei dataa vielä</h3>
                  <p className="text-muted-foreground">
                    Web Vitals -mittaukset tallentuvat automaattisesti kun käyttäjät vierailevat sivustolla.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {METRIC_CONFIG.map((metric) => {
                    const summary = getSummary(metric.name);
                    const Icon = metric.icon;
                    return (
                      <Card key={metric.name} className={`${getRatingBg(summary?.latest_rating)} border-2`}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Icon className={`w-8 h-8 ${getRatingColor(summary?.latest_rating)}`} />
                            <span className={`text-xs font-bold px-2 py-1 rounded ${getRatingBg(summary?.latest_rating)} ${getRatingColor(summary?.latest_rating)}`}>
                              {summary?.latest_rating || 'N/A'}
                            </span>
                          </div>
                          <CardTitle className="text-2xl">{metric.title}</CardTitle>
                          <CardDescription>{metric.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm text-muted-foreground">P75</p>
                              <p className="text-3xl font-bold">
                                {summary ? `${summary.p75_value}${metric.unit}` : 'N/A'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Keskiarvo</p>
                              <p className="text-xl font-semibold">
                                {summary ? `${summary.avg_value}${metric.unit}` : 'N/A'}
                              </p>
                            </div>
                            <div className="flex justify-between text-sm pt-2 border-t">
                              <span className="text-muted-foreground">{summary?.sample_count || 0} mittausta</span>
                              <span className="text-green-500">{summary?.good_count || 0} hyvää</span>
                              <span className="text-red-500">{summary?.poor_count || 0} huonoa</span>
                            </div>
                            <div className="pt-1">
                              <p className="text-xs text-muted-foreground">Tavoite: {metric.good}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {METRIC_CONFIG.map((metric) => {
                  const data = getChartData(metric.name);
                  if (data.length === 0) return null;
                  return (
                    <Card key={`chart-${metric.name}`} className="mb-8">
                      <CardHeader>
                        <CardTitle>{metric.title} — aikasarja</CardTitle>
                        <CardDescription>Viimeisimmät {daysBack} päivää</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </AdminGuard>
  );
};

export default Performance;