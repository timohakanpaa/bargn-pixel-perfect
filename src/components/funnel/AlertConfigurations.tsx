import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Bell } from "lucide-react";

interface AlertConfig {
  id: string;
  funnel_id: string;
  alert_type: string;
  threshold: number;
  comparison: string;
  enabled: boolean;
  notification_email: string | null;
}

interface Funnel {
  id: string;
  name: string;
}

export const AlertConfigurations = () => {
  const [alertConfigs, setAlertConfigs] = useState<AlertConfig[]>([]);
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [configsResult, funnelsResult] = await Promise.all([
        supabase.from('alert_configurations').select('*').order('created_at', { ascending: false }),
        supabase.from('conversion_funnels').select('id, name')
      ]);

      if (configsResult.error) throw configsResult.error;
      if (funnelsResult.error) throw funnelsResult.error;

      setAlertConfigs(configsResult.data || []);
      setFunnels(funnelsResult.data || []);
    } catch (error: any) {
      toast({
        title: "Error loading alerts",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleAlert = async (id: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('alert_configurations')
        .update({ enabled })
        .eq('id', id);

      if (error) throw error;

      setAlertConfigs(prev =>
        prev.map(config => config.id === id ? { ...config, enabled } : config)
      );

      toast({
        title: enabled ? "Alert enabled" : "Alert disabled",
        description: "Alert configuration updated successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error updating alert",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteAlert = async (id: string) => {
    try {
      const { error } = await supabase
        .from('alert_configurations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAlertConfigs(prev => prev.filter(config => config.id !== id));

      toast({
        title: "Alert deleted",
        description: "Alert configuration removed successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error deleting alert",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const addNewAlert = async () => {
    if (funnels.length === 0) return;

    try {
      const { data, error } = await supabase
        .from('alert_configurations')
        .insert({
          funnel_id: funnels[0].id,
          alert_type: 'conversion_rate',
          threshold: 20,
          comparison: 'below',
          enabled: true
        })
        .select()
        .single();

      if (error) throw error;

      setAlertConfigs(prev => [data, ...prev]);

      toast({
        title: "Alert created",
        description: "New alert configuration added"
      });
    } catch (error: any) {
      toast({
        title: "Error creating alert",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateAlert = async (id: string, field: string, value: any) => {
    try {
      const { error } = await supabase
        .from('alert_configurations')
        .update({ [field]: value })
        .eq('id', id);

      if (error) throw error;

      setAlertConfigs(prev =>
        prev.map(config => config.id === id ? { ...config, [field]: value } : config)
      );
    } catch (error: any) {
      toast({
        title: "Error updating alert",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div>Loading alert configurations...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alert Configurations
            </CardTitle>
            <CardDescription>
              Set up alerts to monitor funnel performance
            </CardDescription>
          </div>
          <Button onClick={addNewAlert}>
            <Plus className="h-4 w-4 mr-2" />
            Add Alert
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {alertConfigs.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No alerts configured yet. Click "Add Alert" to create one.
          </p>
        ) : (
          alertConfigs.map((config) => {
            const funnel = funnels.find(f => f.id === config.funnel_id);
            return (
              <Card key={config.id}>
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={config.enabled}
                          onCheckedChange={(enabled) => toggleAlert(config.id, enabled)}
                        />
                        <span className="text-sm font-medium">
                          {config.enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAlert(config.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Funnel</Label>
                        <Select
                          value={config.funnel_id}
                          onValueChange={(value) => updateAlert(config.id, 'funnel_id', value)}
                        >
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
                        <Label>Metric Type</Label>
                        <Select
                          value={config.alert_type}
                          onValueChange={(value) => updateAlert(config.id, 'alert_type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conversion_rate">Conversion Rate</SelectItem>
                            <SelectItem value="drop_off_rate">Drop-off Rate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Comparison</Label>
                        <Select
                          value={config.comparison}
                          onValueChange={(value) => updateAlert(config.id, 'comparison', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="below">Below</SelectItem>
                            <SelectItem value="above">Above</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Threshold (%)</Label>
                        <Input
                          type="number"
                          value={config.threshold}
                          onChange={(e) => updateAlert(config.id, 'threshold', parseFloat(e.target.value))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Notification Email (optional)</Label>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        value={config.notification_email || ""}
                        onChange={(e) => updateAlert(config.id, 'notification_email', e.target.value || null)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Email notifications require Resend API key to be configured
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};