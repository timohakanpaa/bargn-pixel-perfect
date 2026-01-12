-- Force enable RLS on all sensitive tables (FORCE ensures RLS applies even to table owners)
ALTER TABLE public.analytics_events FORCE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_progress FORCE ROW LEVEL SECURITY;
ALTER TABLE public.alert_logs FORCE ROW LEVEL SECURITY;
ALTER TABLE public.alert_configurations FORCE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_funnels FORCE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles FORCE ROW LEVEL SECURITY;