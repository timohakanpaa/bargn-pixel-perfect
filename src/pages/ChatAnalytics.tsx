import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Users, Clock, AlertCircle, LogOut } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

interface AnalyticsSummary {
  date: string;
  total_messages: number;
  unique_sessions: number;
  avg_response_time_ms: number;
  error_count: number;
  success_rate: number;
}

interface TopQuery {
  user_message: string;
  count: number;
}

const ChatAnalytics = () => {
  useBreadcrumbSchema();
  const { loading: authLoading, isAdmin, signOut } = useAuth(true);
  const [summaryData, setSummaryData] = useState<AnalyticsSummary[]>([]);
  const [topQueries, setTopQueries] = useState<TopQuery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && isAdmin) {
      fetchAnalytics();
    }
  }, [authLoading, isAdmin]);

  const fetchAnalytics = async () => {
    try {
      // Fetch summary data
      const { data: summary, error: summaryError } = await supabase
        .from("chat_analytics_summary")
        .select("*")
        .limit(7);

      if (summaryError) throw summaryError;
      setSummaryData(summary || []);

      // Fetch top queries
      const { data: analytics, error: analyticsError } = await supabase
        .from("chat_analytics")
        .select("user_message")
        .eq("error_occurred", false)
        .limit(100);

      if (analyticsError) throw analyticsError;

      // Count message frequency
      const messageCounts = (analytics || []).reduce((acc, item) => {
        const msg = item.user_message.toLowerCase().trim();
        acc[msg] = (acc[msg] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const sorted = Object.entries(messageCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([message, count]) => ({ user_message: message, count }));

      setTopQueries(sorted);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalStats = summaryData.reduce(
    (acc, day) => ({
      messages: acc.messages + day.total_messages,
      sessions: acc.sessions + day.unique_sessions,
      errors: acc.errors + day.error_count,
      avgTime: acc.avgTime + (day.avg_response_time_ms || 0),
    }),
    { messages: 0, sessions: 0, errors: 0, avgTime: 0 }
  );

  const avgResponseTime = summaryData.length > 0 ? totalStats.avgTime / summaryData.length : 0;

  if (authLoading || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Chat Analytics</h1>
              <p className="text-muted-foreground">
                Track user interactions and understand what people are asking about
              </p>
            </div>
            <Button onClick={signOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-20" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-16" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalStats.messages}</div>
                    <p className="text-xs text-muted-foreground">Last 7 days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Unique Sessions</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalStats.sessions}</div>
                    <p className="text-xs text-muted-foreground">Active conversations</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Math.round(avgResponseTime)}ms</div>
                    <p className="text-xs text-muted-foreground">AI processing time</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Errors</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalStats.errors}</div>
                    <p className="text-xs text-muted-foreground">Failed requests</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top User Questions</CardTitle>
                  <CardDescription>Most frequently asked questions by users</CardDescription>
                </CardHeader>
                <CardContent>
                  {topQueries.length === 0 ? (
                    <p className="text-muted-foreground">No data available yet</p>
                  ) : (
                    <div className="space-y-4">
                      {topQueries.map((query, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium line-clamp-1">{query.user_message}</p>
                          </div>
                          <div className="ml-4 flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{query.count}x</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Daily Activity</CardTitle>
                  <CardDescription>Message volume over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {summaryData.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {new Date(day.date).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {day.unique_sessions} sessions
                          </p>
                        </div>
                        <div className="ml-4 flex items-center gap-4">
                          <span className="text-sm">{day.total_messages} messages</span>
                          {day.error_count > 0 && (
                            <span className="text-sm text-destructive">{day.error_count} errors</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChatAnalytics;
