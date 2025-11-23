import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.84.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AlertConfig {
  id: string;
  funnel_id: string;
  alert_type: 'conversion_rate' | 'drop_off_rate';
  threshold: number;
  comparison: 'below' | 'above';
  notification_email: string | null;
}

interface FunnelAnalytics {
  funnel_id: string;
  funnel_name: string;
  completion_rate: number;
  total_entries: number;
  completions: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch active alert configurations
    const { data: alertConfigs, error: configError } = await supabase
      .from('alert_configurations')
      .select('*')
      .eq('enabled', true);

    if (configError) throw configError;

    // Fetch funnel analytics
    const { data: funnelAnalytics, error: analyticsError } = await supabase
      .from('funnel_analytics')
      .select('*');

    if (analyticsError) throw analyticsError;

    const alerts: any[] = [];

    // Check each alert configuration
    for (const config of (alertConfigs as AlertConfig[])) {
      const funnel = (funnelAnalytics as FunnelAnalytics[]).find(
        f => f.funnel_id === config.funnel_id
      );

      if (!funnel) continue;

      let shouldAlert = false;
      let metricValue = 0;
      let message = '';

      if (config.alert_type === 'conversion_rate') {
        metricValue = funnel.completion_rate || 0;
        
        if (config.comparison === 'below' && metricValue < config.threshold) {
          shouldAlert = true;
          message = `Conversion rate for "${funnel.funnel_name}" is ${metricValue.toFixed(1)}%, below threshold of ${config.threshold}%`;
        } else if (config.comparison === 'above' && metricValue > config.threshold) {
          shouldAlert = true;
          message = `Conversion rate for "${funnel.funnel_name}" is ${metricValue.toFixed(1)}%, above threshold of ${config.threshold}%`;
        }
      } else if (config.alert_type === 'drop_off_rate') {
        // Get drop-off data
        const { data: dropOffData, error: dropOffError } = await supabase
          .rpc('get_funnel_dropoff', {
            funnel_id_param: config.funnel_id,
            days_back: 7
          });

        if (!dropOffError && dropOffData && dropOffData.length > 0) {
          // Calculate average drop-off rate
          const avgDropOff = dropOffData.reduce((sum: number, step: any) => 
            sum + (step.drop_off_rate || 0), 0) / dropOffData.length;
          
          metricValue = avgDropOff;

          if (config.comparison === 'above' && avgDropOff > config.threshold) {
            shouldAlert = true;
            message = `Average drop-off rate for "${funnel.funnel_name}" is ${avgDropOff.toFixed(1)}%, above threshold of ${config.threshold}%`;
          } else if (config.comparison === 'below' && avgDropOff < config.threshold) {
            shouldAlert = true;
            message = `Average drop-off rate for "${funnel.funnel_name}" is ${avgDropOff.toFixed(1)}%, below threshold of ${config.threshold}%`;
          }
        }
      }

      if (shouldAlert) {
        // Log the alert
          const { error: logError } = await supabase
            .from('alert_logs')
            .insert({
              alert_config_id: config.id,
              funnel_id: config.funnel_id,
              metric_value: metricValue,
              threshold: config.threshold,
              message: message,
              notification_sent: false,
              metadata: { funnel_name: funnel.funnel_name }
            });

          if (logError) {
            console.error('Error logging alert:', logError);
          } else {
            alerts.push({ config, message, metric_value: metricValue });
            
            // Send email notification if configured and Resend is available
            if (config.notification_email && Deno.env.get('RESEND_API_KEY')) {
              try {
                // Dynamic import for Resend
                const Resend = (await import('https://esm.sh/resend@2.0.0')).Resend;
                const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
                
                await resend.emails.send({
                  from: 'Funnel Alerts <onboarding@resend.dev>',
                  to: [config.notification_email],
                  subject: `Alert: ${funnel.funnel_name} Funnel Issue`,
                  html: `
                    <h2>Funnel Alert Triggered</h2>
                    <p>${message}</p>
                    <p><strong>Metric Type:</strong> ${config.alert_type.replace('_', ' ')}</p>
                    <p><strong>Current Value:</strong> ${metricValue.toFixed(1)}%</p>
                    <p><strong>Threshold:</strong> ${config.threshold}%</p>
                    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                  `
                });
              } catch (emailError) {
                console.error('Error sending email notification:', emailError);
              }
            }
          }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        alerts_triggered: alerts.length,
        alerts: alerts
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error: any) {
    console.error('Error in check-funnel-alerts:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});