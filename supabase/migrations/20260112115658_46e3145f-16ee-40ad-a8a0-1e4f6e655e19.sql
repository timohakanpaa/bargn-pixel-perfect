-- Enable RLS on analytics_events table (it has policies but RLS wasn't enabled)
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Also ensure RLS is enabled on all other sensitive tables (idempotent)
ALTER TABLE public.funnel_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_funnels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;