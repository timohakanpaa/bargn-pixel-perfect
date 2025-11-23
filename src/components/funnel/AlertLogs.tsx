import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AlertLog {
  id: string;
  triggered_at: string;
  message: string;
  metric_value: number;
  threshold: number;
  notification_sent: boolean;
  metadata: any;
}

export const AlertLogs = () => {
  const [logs, setLogs] = useState<AlertLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();

    // Subscribe to new alerts
    const channel = supabase
      .channel('alert_logs')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'alert_logs'
        },
        (payload) => {
          setLogs(prev => [payload.new as AlertLog, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('alert_logs')
        .select('*')
        .order('triggered_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching alert logs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading recent alerts...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Recent Alerts
        </CardTitle>
        <CardDescription>
          Last 20 triggered alerts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">
              No alerts triggered yet. Your funnels are performing well!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">{log.message}</p>
                  {log.metadata?.funnel_name && (
                    <p className="text-xs text-muted-foreground mb-2">
                      Funnel: {log.metadata.funnel_name}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>
                      {formatDistanceToNow(new Date(log.triggered_at), { addSuffix: true })}
                    </span>
                    {log.notification_sent && (
                      <Badge variant="secondary" className="text-xs">
                        Email Sent
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {log.metric_value.toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    vs {log.threshold}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};