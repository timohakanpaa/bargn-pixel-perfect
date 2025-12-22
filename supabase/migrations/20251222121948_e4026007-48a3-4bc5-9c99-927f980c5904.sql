-- PERMANENT FIX: Convert views to secure functions that check admin role
-- This is the correct PostgreSQL pattern for securing aggregated data

-- =====================================================
-- 1. Drop the problematic views
-- =====================================================
DROP VIEW IF EXISTS public.analytics_button_clicks CASCADE;
DROP VIEW IF EXISTS public.analytics_daily_summary CASCADE;
DROP VIEW IF EXISTS public.analytics_page_views CASCADE;
DROP VIEW IF EXISTS public.funnel_analytics CASCADE;

-- =====================================================
-- 2. Create secure functions that check admin role
-- =====================================================

-- Function to get button clicks analytics (admin only)
CREATE OR REPLACE FUNCTION public.get_analytics_button_clicks()
RETURNS TABLE(
  date date,
  event_name text,
  element_text text,
  page_path text,
  click_count bigint,
  unique_users bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user is admin
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    date(ae.created_at) as date,
    ae.event_name,
    ae.element_text,
    ae.page_path,
    COUNT(*)::bigint as click_count,
    COUNT(DISTINCT ae.session_id)::bigint as unique_users
  FROM public.analytics_events ae
  WHERE ae.event_type = 'click'
  GROUP BY date(ae.created_at), ae.event_name, ae.element_text, ae.page_path;
END;
$$;

-- Function to get daily summary analytics (admin only)
CREATE OR REPLACE FUNCTION public.get_analytics_daily_summary()
RETURNS TABLE(
  date date,
  total_events bigint,
  unique_sessions bigint,
  page_views bigint,
  clicks bigint,
  conversions bigint,
  avg_screen_width numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user is admin
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    date(ae.created_at) as date,
    COUNT(*)::bigint as total_events,
    COUNT(DISTINCT ae.session_id)::bigint as unique_sessions,
    COUNT(*) FILTER (WHERE ae.event_type = 'page_view')::bigint as page_views,
    COUNT(*) FILTER (WHERE ae.event_type = 'click')::bigint as clicks,
    COUNT(*) FILTER (WHERE ae.event_type = 'conversion')::bigint as conversions,
    AVG(ae.screen_width) as avg_screen_width
  FROM public.analytics_events ae
  GROUP BY date(ae.created_at);
END;
$$;

-- Function to get page views analytics (admin only)
CREATE OR REPLACE FUNCTION public.get_analytics_page_views()
RETURNS TABLE(
  date date,
  page_path text,
  page_title text,
  views bigint,
  unique_visitors bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user is admin
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    date(ae.created_at) as date,
    ae.page_path,
    ae.page_title,
    COUNT(*)::bigint as views,
    COUNT(DISTINCT ae.session_id)::bigint as unique_visitors
  FROM public.analytics_events ae
  WHERE ae.event_type = 'page_view'
  GROUP BY date(ae.created_at), ae.page_path, ae.page_title;
END;
$$;

-- Function to get funnel analytics (admin only)
CREATE OR REPLACE FUNCTION public.get_funnel_analytics()
RETURNS TABLE(
  funnel_id uuid,
  funnel_name text,
  total_entries bigint,
  completions bigint,
  completion_rate numeric,
  avg_completion_time_minutes numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user is admin
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    cf.id as funnel_id,
    cf.name as funnel_name,
    COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1)::bigint as total_entries,
    COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true)::bigint as completions,
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
END;
$$;

-- =====================================================
-- 3. Grant execute permissions
-- =====================================================
GRANT EXECUTE ON FUNCTION public.get_analytics_button_clicks() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_analytics_daily_summary() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_analytics_page_views() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_funnel_analytics() TO authenticated;

GRANT EXECUTE ON FUNCTION public.get_analytics_button_clicks() TO service_role;
GRANT EXECUTE ON FUNCTION public.get_analytics_daily_summary() TO service_role;
GRANT EXECUTE ON FUNCTION public.get_analytics_page_views() TO service_role;
GRANT EXECUTE ON FUNCTION public.get_funnel_analytics() TO service_role;

-- Revoke from anon
REVOKE EXECUTE ON FUNCTION public.get_analytics_button_clicks() FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_analytics_daily_summary() FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_analytics_page_views() FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_funnel_analytics() FROM anon;

-- =====================================================
-- 4. Fix conversion_funnels policies for admin CRUD
-- =====================================================
DROP POLICY IF EXISTS "Admins can view funnels" ON public.conversion_funnels;
DROP POLICY IF EXISTS "Allow service role full access to funnels" ON public.conversion_funnels;

-- Create comprehensive admin policies
CREATE POLICY "Admins can view funnels"
ON public.conversion_funnels
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert funnels"
ON public.conversion_funnels
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update funnels"
ON public.conversion_funnels
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete funnels"
ON public.conversion_funnels
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Service role policy for backend operations
CREATE POLICY "Service role full access to funnels"
ON public.conversion_funnels
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);