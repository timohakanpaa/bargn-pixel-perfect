-- Secure analytics views by revoking public access
-- Only authenticated users should access these, and they'll be subject to underlying table RLS

-- Revoke all access from public/anon roles on analytics views
REVOKE ALL ON public.analytics_button_clicks FROM anon;
REVOKE ALL ON public.analytics_button_clicks FROM public;

REVOKE ALL ON public.analytics_daily_summary FROM anon;
REVOKE ALL ON public.analytics_daily_summary FROM public;

REVOKE ALL ON public.analytics_page_views FROM anon;
REVOKE ALL ON public.analytics_page_views FROM public;

-- Revoke from authenticated too, we'll re-grant with proper restrictions
REVOKE ALL ON public.analytics_button_clicks FROM authenticated;
REVOKE ALL ON public.analytics_daily_summary FROM authenticated;
REVOKE ALL ON public.analytics_page_views FROM authenticated;

-- Grant SELECT only to service_role (for backend operations)
GRANT SELECT ON public.analytics_button_clicks TO service_role;
GRANT SELECT ON public.analytics_daily_summary TO service_role;
GRANT SELECT ON public.analytics_page_views TO service_role;

-- Grant SELECT to authenticated - they will be subject to underlying table's RLS
-- which requires admin role
GRANT SELECT ON public.analytics_button_clicks TO authenticated;
GRANT SELECT ON public.analytics_daily_summary TO authenticated;
GRANT SELECT ON public.analytics_page_views TO authenticated;

-- Also secure the funnel_analytics view if it exists
REVOKE ALL ON public.funnel_analytics FROM anon;
REVOKE ALL ON public.funnel_analytics FROM public;
GRANT SELECT ON public.funnel_analytics TO service_role;
GRANT SELECT ON public.funnel_analytics TO authenticated;