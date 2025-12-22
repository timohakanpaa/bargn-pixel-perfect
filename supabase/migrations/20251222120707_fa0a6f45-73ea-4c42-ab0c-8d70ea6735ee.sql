-- Enable security_invoker on analytics views so they respect RLS policies
-- This ensures the views use the permissions of the calling user, not the view owner

-- First, we need to recreate the views with security_invoker = true
-- Get the current view definitions and recreate them

-- Drop and recreate analytics_button_clicks view with security_invoker
DROP VIEW IF EXISTS public.analytics_button_clicks;
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

-- Drop and recreate analytics_daily_summary view with security_invoker
DROP VIEW IF EXISTS public.analytics_daily_summary;
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

-- Drop and recreate analytics_page_views view with security_invoker
DROP VIEW IF EXISTS public.analytics_page_views;
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

-- Grant SELECT on views to authenticated users (RLS on underlying table will still apply)
GRANT SELECT ON public.analytics_button_clicks TO authenticated;
GRANT SELECT ON public.analytics_daily_summary TO authenticated;
GRANT SELECT ON public.analytics_page_views TO authenticated;