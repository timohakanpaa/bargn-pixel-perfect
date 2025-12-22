-- AGGRESSIVE FIX: Completely restrict all analytics views to service_role only
-- This ensures no direct API access is possible

-- First, revoke ALL access from ALL roles on analytics views
REVOKE ALL ON public.analytics_button_clicks FROM PUBLIC;
REVOKE ALL ON public.analytics_button_clicks FROM anon;
REVOKE ALL ON public.analytics_button_clicks FROM authenticated;

REVOKE ALL ON public.analytics_daily_summary FROM PUBLIC;
REVOKE ALL ON public.analytics_daily_summary FROM anon;
REVOKE ALL ON public.analytics_daily_summary FROM authenticated;

REVOKE ALL ON public.analytics_page_views FROM PUBLIC;
REVOKE ALL ON public.analytics_page_views FROM anon;
REVOKE ALL ON public.analytics_page_views FROM authenticated;

REVOKE ALL ON public.funnel_analytics FROM PUBLIC;
REVOKE ALL ON public.funnel_analytics FROM anon;
REVOKE ALL ON public.funnel_analytics FROM authenticated;

-- Only grant to service_role (for backend/edge function access)
GRANT SELECT ON public.analytics_button_clicks TO service_role;
GRANT SELECT ON public.analytics_daily_summary TO service_role;
GRANT SELECT ON public.analytics_page_views TO service_role;
GRANT SELECT ON public.funnel_analytics TO service_role;

-- Also ensure the postgres role (table owner) can access for maintenance
GRANT SELECT ON public.analytics_button_clicks TO postgres;
GRANT SELECT ON public.analytics_daily_summary TO postgres;
GRANT SELECT ON public.analytics_page_views TO postgres;
GRANT SELECT ON public.funnel_analytics TO postgres;