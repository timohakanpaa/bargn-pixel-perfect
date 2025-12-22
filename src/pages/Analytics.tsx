import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  MousePointer, 
  Activity, 
  Users, 
  TrendingUp,
  Navigation as NavigationIcon,
  FileText,
  Target,
  LogOut
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAnalytics } from "@/hooks/use-analytics";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";
import { useAuth } from "@/hooks/use-auth";

interface DailySummary {
  date: string;
  total_events: number;
  unique_sessions: number;
  page_views: number;
  clicks: number;
  conversions: number;
  avg_screen_width: number;
}

interface PageView {
  date: string;
  page_path: string;
  page_title: string;
  views: number;
  unique_visitors: number;
}

interface ButtonClick {
  date: string;
  event_name: string;
  element_text: string;
  page_path: string;
  click_count: number;
  unique_users: number;
}

const Analytics = () => {
  useAnalytics(); // Track page view
  useBreadcrumbSchema();
  const { loading: authLoading, isAdmin, signOut } = useAuth(true);
  
  const [dailySummary, setDailySummary] = useState<DailySummary[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [buttonClicks, setButtonClicks] = useState<ButtonClick[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && isAdmin) {
      fetchAnalytics();
    }
  }, [authLoading, isAdmin]);

  const fetchAnalytics = async () => {
    try {
      // Fetch daily summary using secure function
      const { data: summary, error: summaryError } = await supabase
        .rpc("get_analytics_daily_summary");

      if (summaryError) {
        console.error("Error fetching daily summary:", summaryError);
      } else {
        setDailySummary((summary as DailySummary[]) || []);
      }

      // Fetch page views using secure function
      const { data: pages, error: pagesError } = await supabase
        .rpc("get_analytics_page_views");

      if (pagesError) {
        console.error("Error fetching page views:", pagesError);
      } else {
        setPageViews((pages as PageView[]) || []);
      }

      // Fetch button clicks using secure function
      const { data: clicks, error: clicksError } = await supabase
        .rpc("get_analytics_button_clicks");

      if (clicksError) {
        console.error("Error fetching button clicks:", clicksError);
      } else {
        setButtonClicks((clicks as ButtonClick[]) || []);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalStats = dailySummary.reduce(
    (acc, day) => ({
      events: acc.events + day.total_events,
      sessions: acc.sessions + day.unique_sessions,
      pageViews: acc.pageViews + day.page_views,
      clicks: acc.clicks + day.clicks,
      conversions: acc.conversions + day.conversions,
    }),
    { events: 0, sessions: 0, pageViews: 0, clicks: 0, conversions: 0 }
  );

  if (authLoading || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
                <p className="text-muted-foreground">
                  Track every interaction across your application
                </p>
              </div>
              <div className="flex gap-2">
                <Link to="/funnels">
                  <Button variant="secondary" className="gap-2">
                    <Target className="w-4 h-4" />
                    View Conversion Funnels
                  </Button>
                </Link>
                <Button onClick={signOut} variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(6)].map((_, i) => (
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
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalStats.events.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sessions</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalStats.sessions.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Unique visitors</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalStats.pageViews.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Total views</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Button Clicks</CardTitle>
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalStats.clicks.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">User interactions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalStats.conversions.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Form submissions</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Tables */}
              <Tabs defaultValue="pages" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="pages">Page Views</TabsTrigger>
                  <TabsTrigger value="clicks">Button Clicks</TabsTrigger>
                  <TabsTrigger value="daily">Daily Breakdown</TabsTrigger>
                </TabsList>

                <TabsContent value="pages" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Pages</CardTitle>
                      <CardDescription>Most visited pages in your app</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {pageViews.length === 0 ? (
                        <p className="text-muted-foreground">No data available yet</p>
                      ) : (
                        <div className="space-y-4">
                          {pageViews.slice(0, 20).map((page, index) => (
                            <div key={index} className="flex items-center justify-between border-b pb-2">
                              <div className="flex-1">
                                <p className="text-sm font-medium">{page.page_path}</p>
                                <p className="text-xs text-muted-foreground">{page.page_title}</p>
                              </div>
                              <div className="ml-4 flex items-center gap-4 text-sm">
                                <span>{page.views.toLocaleString()} views</span>
                                <span className="text-muted-foreground">
                                  {page.unique_visitors.toLocaleString()} visitors
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="clicks" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Button Clicks</CardTitle>
                      <CardDescription>Most clicked buttons and CTAs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {buttonClicks.length === 0 ? (
                        <p className="text-muted-foreground">No data available yet</p>
                      ) : (
                        <div className="space-y-4">
                          {buttonClicks.slice(0, 20).map((click, index) => (
                            <div key={index} className="flex items-center justify-between border-b pb-2">
                              <div className="flex-1">
                                <p className="text-sm font-medium">{click.element_text || click.event_name}</p>
                                <p className="text-xs text-muted-foreground">{click.page_path}</p>
                              </div>
                              <div className="ml-4 flex items-center gap-4 text-sm">
                                <span>{click.click_count.toLocaleString()} clicks</span>
                                <span className="text-muted-foreground">
                                  {click.unique_users.toLocaleString()} users
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="daily" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Daily Activity</CardTitle>
                      <CardDescription>Event breakdown by day</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {dailySummary.slice(0, 14).map((day, index) => (
                          <div key={index} className="flex items-center justify-between border-b pb-2">
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {new Date(day.date).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {day.unique_sessions.toLocaleString()} sessions
                              </p>
                            </div>
                            <div className="ml-4 grid grid-cols-3 gap-4 text-xs">
                              <span>{day.page_views.toLocaleString()} views</span>
                              <span>{day.clicks.toLocaleString()} clicks</span>
                              <span>{day.conversions.toLocaleString()} conversions</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
