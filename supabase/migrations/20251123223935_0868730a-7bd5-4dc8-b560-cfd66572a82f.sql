-- Drop public analytics views that expose aggregated data
-- Admins can query the secured base tables directly instead
DROP VIEW IF EXISTS public.analytics_button_clicks CASCADE;
DROP VIEW IF EXISTS public.analytics_page_views CASCADE;
DROP VIEW IF EXISTS public.analytics_daily_summary CASCADE;
DROP VIEW IF EXISTS public.analytics_navigation_flow CASCADE;
DROP VIEW IF EXISTS public.chat_analytics_summary CASCADE;
DROP VIEW IF EXISTS public.funnel_analytics CASCADE;