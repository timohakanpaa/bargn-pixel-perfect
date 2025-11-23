import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, Clock, Target } from "lucide-react";

interface CohortData {
  cohort_name: string;
  total_entries: number;
  completions: number;
  completion_rate: number;
  avg_time_to_complete: number;
}

interface Funnel {
  id: string;
  name: string;
}

export const CohortAnalysis = () => {
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [selectedFunnel, setSelectedFunnel] = useState<string>("");
  const [cohortType, setCohortType] = useState<string>("language");
  const [daysBack, setDaysBack] = useState<number>(30);
  const [cohortData, setCohortData] = useState<CohortData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFunnels();
  }, []);

  useEffect(() => {
    if (selectedFunnel) {
      fetchCohortData();
    }
  }, [selectedFunnel, cohortType, daysBack]);

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

  const fetchCohortData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_funnel_cohort_analysis', {
        funnel_id_param: selectedFunnel,
        cohort_type: cohortType,
        days_back: daysBack
      });

      if (error) throw error;
      setCohortData(data || []);
    } catch (error) {
      console.error('Error fetching cohort data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCompletionRateColor = (rate: number) => {
    if (rate >= 50) return "text-primary";
    if (rate >= 25) return "text-accent";
    return "text-destructive";
  };

  const getBestPerformingCohort = () => {
    if (cohortData.length === 0) return null;
    return cohortData.reduce((best, current) => 
      current.completion_rate > best.completion_rate ? current : best
    );
  };

  const getWorstPerformingCohort = () => {
    if (cohortData.length === 0) return null;
    return cohortData.reduce((worst, current) => 
      current.completion_rate < worst.completion_rate ? current : worst
    );
  };

  const selectedFunnelName = funnels.find(f => f.id === selectedFunnel)?.name || "";
  const bestCohort = getBestPerformingCohort();
  const worstCohort = getWorstPerformingCohort();

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Cohort Analysis Filters</CardTitle>
          <CardDescription>
            Compare funnel performance across different user segments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Funnel</Label>
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

            <div>
              <Label>Segment By</Label>
              <Select value={cohortType} onValueChange={setCohortType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="language">Language</SelectItem>
                  <SelectItem value="device">Device Type</SelectItem>
                  <SelectItem value="referrer">Referral Source</SelectItem>
                  <SelectItem value="time_period">Time Period</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Time Range</Label>
              <Select value={daysBack.toString()} onValueChange={(v) => setDaysBack(parseInt(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="60">Last 60 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      {cohortData.length > 1 && bestCohort && worstCohort && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-primary/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Best Performing Cohort
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{bestCohort.cohort_name}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {bestCohort.completion_rate}% conversion rate
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4 text-destructive" />
                Needs Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{worstCohort.cohort_name}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {worstCohort.completion_rate}% conversion rate
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cohort Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>{selectedFunnelName} - Cohort Performance</CardTitle>
          <CardDescription>
            Segmented by {cohortType.replace('_', ' ')} over the last {daysBack} days
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4">Loading cohort data...</p>
            </div>
          ) : cohortData.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No data available for this cohort analysis.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cohort</TableHead>
                    <TableHead className="text-right">Entries</TableHead>
                    <TableHead className="text-right">Completions</TableHead>
                    <TableHead className="text-right">Conversion Rate</TableHead>
                    <TableHead className="text-right">Avg. Time</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cohortData.map((cohort) => (
                    <TableRow key={cohort.cohort_name}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {cohort.cohort_name}
                          {bestCohort?.cohort_name === cohort.cohort_name && (
                            <Badge variant="default" className="text-xs">Best</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {cohort.total_entries.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {cohort.completions.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`font-bold ${getCompletionRateColor(cohort.completion_rate)}`}>
                          {cohort.completion_rate}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">
                            {cohort.avg_time_to_complete 
                              ? `${cohort.avg_time_to_complete.toFixed(0)}m`
                              : 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full max-w-[150px]">
                          <Progress 
                            value={cohort.completion_rate} 
                            className="h-2"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};