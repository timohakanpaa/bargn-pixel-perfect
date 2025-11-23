-- Create alert configurations table
CREATE TABLE public.alert_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  funnel_id UUID REFERENCES public.conversion_funnels(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('conversion_rate', 'drop_off_rate')),
  threshold NUMERIC NOT NULL,
  comparison TEXT NOT NULL CHECK (comparison IN ('below', 'above')),
  enabled BOOLEAN NOT NULL DEFAULT true,
  notification_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create alert logs table
CREATE TABLE public.alert_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  alert_config_id UUID REFERENCES public.alert_configurations(id) ON DELETE CASCADE,
  funnel_id UUID REFERENCES public.conversion_funnels(id) ON DELETE CASCADE,
  triggered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metric_value NUMERIC NOT NULL,
  threshold NUMERIC NOT NULL,
  message TEXT NOT NULL,
  notification_sent BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.alert_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for alert configurations
CREATE POLICY "Allow service role full access to alert configurations"
ON public.alert_configurations
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow public read access to alert configurations"
ON public.alert_configurations
FOR SELECT
USING (true);

-- RLS policies for alert logs
CREATE POLICY "Allow service role full access to alert logs"
ON public.alert_logs
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow public read access to alert logs"
ON public.alert_logs
FOR SELECT
USING (true);

-- Create indexes
CREATE INDEX idx_alert_configurations_funnel_id ON public.alert_configurations(funnel_id);
CREATE INDEX idx_alert_configurations_enabled ON public.alert_configurations(enabled);
CREATE INDEX idx_alert_logs_funnel_id ON public.alert_logs(funnel_id);
CREATE INDEX idx_alert_logs_triggered_at ON public.alert_logs(triggered_at DESC);
CREATE INDEX idx_alert_logs_alert_config_id ON public.alert_logs(alert_config_id);

-- Insert default alert configurations
INSERT INTO public.alert_configurations (funnel_id, alert_type, threshold, comparison, notification_email) 
SELECT id, 'conversion_rate', 20, 'below', null
FROM public.conversion_funnels 
WHERE name = 'Member Signup';

INSERT INTO public.alert_configurations (funnel_id, alert_type, threshold, comparison, notification_email)
SELECT id, 'drop_off_rate', 50, 'above', null
FROM public.conversion_funnels 
WHERE name = 'Partner Signup';