import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Activity, Users, TrendingUp, CheckCircle, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FunnelStep {
  step_number: number;
  step_name: string;
}

interface Funnel {
  id: string;
  name: string;
  steps: FunnelStep[];
}

interface StepCount {
  step_number: number;
  active_users: number;
}

interface RecentActivity {
  id: string;
  session_id: string;
  current_step: number;
  timestamp: string;
}

export const RealtimeMonitor = () => {
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [selectedFunnel, setSelectedFunnel] = useState<string>("");
  const [stepCounts, setStepCounts] = useState<Map<number, number>>(new Map());
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [pulseSteps, setPulseSteps] = useState<Set<number>>(new Set());
  const activityTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    fetchFunnels();
  }, []);

  useEffect(() => {
    if (selectedFunnel) {
      fetchCurrentCounts();
      subscribeToChanges();
    }

    return () => {
      supabase.removeAllChannels();
    };
  }, [selectedFunnel]);

  const fetchFunnels = async () => {
    try {
      const { data, error } = await supabase
        .from('conversion_funnels')
        .select('id, name, steps')
        .eq('is_active', true);

      if (error) throw error;

      const funnelData = data.map(f => ({
        ...f,
        steps: f.steps as unknown as FunnelStep[]
      }));
      setFunnels(funnelData);
      if (funnelData.length > 0) {
        setSelectedFunnel(funnelData[0].id);
      }
    } catch (error) {
      console.error('Error fetching funnels:', error);
    }
  };

  const fetchCurrentCounts = async () => {
    try {
      // Get active sessions in the last 30 minutes
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
      
      const { data, error } = await supabase
        .from('funnel_progress')
        .select('current_step, session_id')
        .eq('funnel_id', selectedFunnel)
        .eq('completed', false)
        .gte('created_at', thirtyMinutesAgo);

      if (error) throw error;

      // Count users at each step
      const counts = new Map<number, number>();
      data?.forEach(record => {
        const current = counts.get(record.current_step) || 0;
        counts.set(record.current_step, current + 1);
      });

      setStepCounts(counts);
    } catch (error) {
      console.error('Error fetching current counts:', error);
    }
  };

  const subscribeToChanges = () => {
    const channel = supabase
      .channel('funnel-progress-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'funnel_progress',
          filter: `funnel_id=eq.${selectedFunnel}`
        },
        (payload) => {
          handleRealtimeUpdate(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleRealtimeUpdate = (payload: any) => {
    const { eventType, new: newRecord, old: oldRecord } = payload;

    if (eventType === 'INSERT' || eventType === 'UPDATE') {
      const record = newRecord;
      
      // Add to recent activity
      addRecentActivity({
        id: record.id,
        session_id: record.session_id,
        current_step: record.current_step,
        timestamp: new Date().toISOString()
      });

      // Trigger pulse animation
      setPulseSteps(prev => new Set(prev).add(record.current_step));
      setTimeout(() => {
        setPulseSteps(prev => {
          const next = new Set(prev);
          next.delete(record.current_step);
          return next;
        });
      }, 1000);

      // Update counts if not completed
      if (!record.completed) {
        setStepCounts(prev => {
          const next = new Map(prev);
          
          // Decrement old step if it was an update
          if (eventType === 'UPDATE' && oldRecord && oldRecord.current_step !== record.current_step) {
            const oldCount = next.get(oldRecord.current_step) || 0;
            if (oldCount > 0) {
              next.set(oldRecord.current_step, oldCount - 1);
            }
          }
          
          // Increment new step
          const currentCount = next.get(record.current_step) || 0;
          next.set(record.current_step, currentCount + 1);
          
          return next;
        });
      } else {
        // If completed, remove from current step count
        setStepCounts(prev => {
          const next = new Map(prev);
          const currentCount = next.get(record.current_step) || 0;
          if (currentCount > 0) {
            next.set(record.current_step, currentCount - 1);
          }
          return next;
        });
      }
    }
  };

  const addRecentActivity = (activity: RecentActivity) => {
    setRecentActivity(prev => {
      const updated = [activity, ...prev.slice(0, 9)];
      return updated;
    });

    // Auto-remove after 5 seconds
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }
    activityTimeoutRef.current = setTimeout(() => {
      setRecentActivity(prev => prev.slice(0, 10));
    }, 5000);
  };

  const selectedFunnelData = funnels.find(f => f.id === selectedFunnel);
  const totalActiveUsers = Array.from(stepCounts.values()).reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 animate-pulse text-primary" />
                Real-time Funnel Monitor
              </CardTitle>
              <CardDescription>
                Live tracking of users progressing through your funnels
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              {totalActiveUsers} Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Select Funnel</Label>
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
          </div>
        </CardContent>
      </Card>

      {/* Live Step Visualization */}
      {selectedFunnelData && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedFunnelData.name} - Live Progress</CardTitle>
            <CardDescription>
              Active users at each step (last 30 minutes)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedFunnelData.steps.map((step, index) => {
                const userCount = stepCounts.get(step.step_number) || 0;
                const isPulsing = pulseSteps.has(step.step_number);
                const percentage = totalActiveUsers > 0 
                  ? (userCount / totalActiveUsers) * 100 
                  : 0;

                return (
                  <motion.div
                    key={step.step_number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div 
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                        isPulsing 
                          ? "bg-primary/10 border-primary shadow-glow-purple scale-[1.02]" 
                          : "bg-card border-border"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                            userCount > 0 
                              ? "bg-gradient-purple-yellow text-foreground" 
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step.step_number}
                        </div>
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{step.step_name}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-purple-yellow"
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>

                      <div className="flex-shrink-0 text-right">
                        <motion.div
                          key={userCount}
                          initial={{ scale: 1.5 }}
                          animate={{ scale: 1 }}
                          className="text-3xl font-bold text-primary"
                        >
                          {userCount}
                        </motion.div>
                        <div className="text-xs text-muted-foreground">
                          {userCount === 1 ? 'user' : 'users'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest user movements through the funnel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {recentActivity.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Circle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Waiting for user activity...</p>
                </div>
              ) : (
                recentActivity.map((activity) => {
                  const step = selectedFunnelData?.steps.find(
                    s => s.step_number === activity.current_step
                  );
                  
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                    >
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-sm">
                          User <span className="font-mono text-xs text-muted-foreground">
                            {activity.session_id.slice(0, 8)}...
                          </span> reached
                        </span>
                        <span className="font-semibold ml-1">
                          {step?.step_name || `Step ${activity.current_step}`}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </span>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};