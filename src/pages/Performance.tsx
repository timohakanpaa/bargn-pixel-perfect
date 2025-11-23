import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Activity, TrendingUp, Gauge, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  timestamp: number;
}

const Performance = () => {
  const [metrics, setMetrics] = useState<WebVitalsMetric[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    loadMetrics();
    setLastUpdated(new Date());
  }, []);

  const loadMetrics = () => {
    try {
      const stored = localStorage.getItem('web-vitals-history');
      if (stored) {
        setMetrics(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load web vitals:', error);
    }
  };

  const clearData = () => {
    localStorage.removeItem('web-vitals-history');
    setMetrics([]);
  };

  const getMetricsByType = (type: string) => {
    return metrics
      .filter(m => m.name === type)
      .map(m => ({
        time: new Date(m.timestamp).toLocaleTimeString(),
        value: Math.round(m.value),
        rating: m.rating,
      }));
  };

  const getLatestMetric = (type: string) => {
    const typeMetrics = metrics.filter(m => m.name === type);
    return typeMetrics[typeMetrics.length - 1];
  };

  const getAverageMetric = (type: string) => {
    const typeMetrics = metrics.filter(m => m.name === type);
    if (typeMetrics.length === 0) return null;
    const sum = typeMetrics.reduce((acc, m) => acc + m.value, 0);
    return Math.round(sum / typeMetrics.length);
  };

  const getRatingColor = (rating?: 'good' | 'needs-improvement' | 'poor') => {
    switch (rating) {
      case 'good': return 'text-green-500';
      case 'needs-improvement': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getRatingBg = (rating?: 'good' | 'needs-improvement' | 'poor') => {
    switch (rating) {
      case 'good': return 'bg-green-500/10';
      case 'needs-improvement': return 'bg-yellow-500/10';
      case 'poor': return 'bg-red-500/10';
      default: return 'bg-muted';
    }
  };

  const metricCards = [
    {
      name: 'LCP',
      title: 'Largest Contentful Paint',
      description: 'Loading performance',
      icon: Zap,
      unit: 'ms',
      goodThreshold: '< 2.5s',
    },
    {
      name: 'INP',
      title: 'Interaction to Next Paint',
      description: 'Responsiveness',
      icon: Activity,
      unit: 'ms',
      goodThreshold: '< 200ms',
    },
    {
      name: 'CLS',
      title: 'Cumulative Layout Shift',
      description: 'Visual stability',
      icon: Gauge,
      unit: '',
      goodThreshold: '< 0.1',
    },
    {
      name: 'FCP',
      title: 'First Contentful Paint',
      description: 'Initial render time',
      icon: TrendingUp,
      unit: 'ms',
      goodThreshold: '< 1.8s',
    },
    {
      name: 'TTFB',
      title: 'Time to First Byte',
      description: 'Server response time',
      icon: Clock,
      unit: 'ms',
      goodThreshold: '< 800ms',
    },
  ];

  return (
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
                Core Web Vitals monitoring for SEO & UX optimization
              </p>
              {lastUpdated && (
                <p className="text-sm text-muted-foreground mt-2">
                  Last updated: {lastUpdated.toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={loadMetrics} variant="outline">
                Refresh
              </Button>
              <Button onClick={clearData} variant="destructive">
                Clear Data
              </Button>
            </div>
          </div>

          {metrics.length === 0 ? (
            <Card className="border-2 border-dashed">
              <CardContent className="pt-12 pb-12 text-center">
                <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">No Data Yet</h3>
                <p className="text-muted-foreground">
                  Navigate around the site to collect Core Web Vitals metrics.
                  <br />
                  Data will appear here automatically as you use the app.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {metricCards.map((metric) => {
                  const latest = getLatestMetric(metric.name);
                  const average = getAverageMetric(metric.name);
                  const Icon = metric.icon;

                  return (
                    <Card key={metric.name} className={`${getRatingBg(latest?.rating)} border-2`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Icon className={`w-8 h-8 ${getRatingColor(latest?.rating)}`} />
                          <span className={`text-xs font-bold px-2 py-1 rounded ${getRatingBg(latest?.rating)} ${getRatingColor(latest?.rating)}`}>
                            {latest?.rating || 'N/A'}
                          </span>
                        </div>
                        <CardTitle className="text-2xl">{metric.title}</CardTitle>
                        <CardDescription>{metric.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Current</p>
                            <p className="text-3xl font-bold">
                              {latest ? `${Math.round(latest.value)}${metric.unit}` : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Average</p>
                            <p className="text-xl font-semibold">
                              {average ? `${average}${metric.unit}` : 'N/A'}
                            </p>
                          </div>
                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground">
                              Good: {metric.goodThreshold}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Charts */}
              {metricCards.map((metric) => {
                const data = getMetricsByType(metric.name);
                if (data.length === 0) return null;

                return (
                  <Card key={`chart-${metric.name}`} className="mb-8">
                    <CardHeader>
                      <CardTitle>{metric.title} Over Time</CardTitle>
                      <CardDescription>
                        Historical data for {metric.name} metric
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            dot={{ fill: 'hsl(var(--primary))' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          )}

          {/* Info Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>About Core Web Vitals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">What are Core Web Vitals?</h4>
                <p className="text-muted-foreground">
                  Core Web Vitals are a set of metrics that measure real-world user experience for loading performance, interactivity, and visual stability.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-green-500 mb-1">Good</h5>
                  <p className="text-sm text-muted-foreground">Meets recommended thresholds</p>
                </div>
                <div>
                  <h5 className="font-semibold text-yellow-500 mb-1">Needs Improvement</h5>
                  <p className="text-sm text-muted-foreground">Below ideal but acceptable</p>
                </div>
                <div>
                  <h5 className="font-semibold text-red-500 mb-1">Poor</h5>
                  <p className="text-sm text-muted-foreground">Requires optimization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Performance;
