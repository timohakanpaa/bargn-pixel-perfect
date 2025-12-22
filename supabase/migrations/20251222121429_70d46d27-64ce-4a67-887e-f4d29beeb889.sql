-- COMPREHENSIVE SECURITY FIX FOR ALL ANALYTICS VIEWS AND TABLES

-- =====================================================
-- 1. FIX: Recreate all analytics views with proper security
-- =====================================================

-- Drop existing views to recreate with security_invoker
DROP VIEW IF EXISTS public.analytics_button_clicks CASCADE;
DROP VIEW IF EXISTS public.analytics_daily_summary CASCADE;
DROP VIEW IF EXISTS public.analytics_page_views CASCADE;
DROP VIEW IF EXISTS public.funnel_analytics CASCADE;

-- Recreate analytics_button_clicks with security_invoker = true
CREATE VIEW public.analytics_button_clicks
WITH (security_invoker = true)
AS
SELECT 
  date(created_at) as date,
  event_name,
  element_text,
  page_path,
  COUNT(*) as click_count,
  COUNT(DISTINCT session_id) as unique_users
FROM public.analytics_events
WHERE event_type = 'click'
GROUP BY date(created_at), event_name, element_text, page_path;

-- Recreate analytics_daily_summary with security_invoker = true
CREATE VIEW public.analytics_daily_summary
WITH (security_invoker = true)
AS
SELECT 
  date(created_at) as date,
  COUNT(*) as total_events,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(*) FILTER (WHERE event_type = 'page_view') as page_views,
  COUNT(*) FILTER (WHERE event_type = 'click') as clicks,
  COUNT(*) FILTER (WHERE event_type = 'conversion') as conversions,
  AVG(screen_width) as avg_screen_width
FROM public.analytics_events
GROUP BY date(created_at);

-- Recreate analytics_page_views with security_invoker = true
CREATE VIEW public.analytics_page_views
WITH (security_invoker = true)
AS
SELECT 
  date(created_at) as date,
  page_path,
  page_title,
  COUNT(*) as views,
  COUNT(DISTINCT session_id) as unique_visitors
FROM public.analytics_events
WHERE event_type = 'page_view'
GROUP BY date(created_at), page_path, page_title;

-- Recreate funnel_analytics with security_invoker = true
CREATE VIEW public.funnel_analytics
WITH (security_invoker = true)
AS
SELECT 
  cf.id as funnel_id,
  cf.name as funnel_name,
  COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1) as total_entries,
  COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true) as completions,
  ROUND(
    (COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true)::NUMERIC / 
     NULLIF(COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1), 0) * 100),
    2
  ) as completion_rate,
  ROUND(
    AVG(EXTRACT(EPOCH FROM (fp.completed_at - fp.created_at)) / 60)
    FILTER (WHERE fp.completed = true),
    2
  ) as avg_completion_time_minutes
FROM public.conversion_funnels cf
LEFT JOIN public.funnel_progress fp ON cf.id = fp.funnel_id
GROUP BY cf.id, cf.name;

-- =====================================================
-- 2. REVOKE all public access from views
-- =====================================================
REVOKE ALL ON public.analytics_button_clicks FROM anon, public;
REVOKE ALL ON public.analytics_daily_summary FROM anon, public;
REVOKE ALL ON public.analytics_page_views FROM anon, public;
REVOKE ALL ON public.funnel_analytics FROM anon, public;

-- Grant only to service_role and authenticated (who will be subject to underlying RLS)
GRANT SELECT ON public.analytics_button_clicks TO service_role, authenticated;
GRANT SELECT ON public.analytics_daily_summary TO service_role, authenticated;
GRANT SELECT ON public.analytics_page_views TO service_role, authenticated;
GRANT SELECT ON public.funnel_analytics TO service_role, authenticated;

-- =====================================================
-- 3. FIX: Protect notification_email in alert_configurations
-- =====================================================

-- Drop existing policies on alert_configurations
DROP POLICY IF EXISTS "Admins can view alert configurations" ON public.alert_configurations;
DROP POLICY IF EXISTS "Admins can insert alert configurations" ON public.alert_configurations;
DROP POLICY IF EXISTS "Admins can update alert configurations" ON public.alert_configurations;
DROP POLICY IF EXISTS "Admins can delete alert configurations" ON public.alert_configurations;

-- Create a function to check if user owns the alert config or is super admin
CREATE OR REPLACE FUNCTION public.can_access_alert_config(config_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- For now, only admins can access alert configs
  -- This could be extended to check ownership if user_id is added to the table
  SELECT public.has_role(auth.uid(), 'admin'::app_role)
$$;

-- Recreate policies with stricter access
CREATE POLICY "Admins can view alert configurations"
ON public.alert_configurations
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert alert configurations"
ON public.alert_configurations
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update alert configurations"
ON public.alert_configurations
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete alert configurations"
ON public.alert_configurations
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Ensure RLS is forced
ALTER TABLE public.alert_configurations FORCE ROW LEVEL SECURITY;

-- =====================================================
-- 4. Ensure all base tables have proper RLS
-- =====================================================

-- Ensure analytics_events has RLS forced
ALTER TABLE public.analytics_events FORCE ROW LEVEL SECURITY;

-- Ensure conversion_funnels has RLS forced
ALTER TABLE public.conversion_funnels FORCE ROW LEVEL SECURITY;

-- Ensure funnel_progress has RLS forced
ALTER TABLE public.funnel_progress FORCE ROW LEVEL SECURITY;

-- Ensure alert_logs has RLS forced
ALTER TABLE public.alert_logs FORCE ROW LEVEL SECURITY;

-- Ensure user_roles has RLS forced
ALTER TABLE public.user_roles FORCE ROW LEVEL SECURITY;