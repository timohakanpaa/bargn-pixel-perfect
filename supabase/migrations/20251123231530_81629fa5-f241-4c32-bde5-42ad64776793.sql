-- Enable security invoker on all analytics views
-- This makes views respect RLS policies on underlying tables

ALTER VIEW analytics_button_clicks SET (security_invoker = true);
ALTER VIEW analytics_daily_summary SET (security_invoker = true);
ALTER VIEW analytics_page_views SET (security_invoker = true);
ALTER VIEW chat_analytics_summary SET (security_invoker = true);
ALTER VIEW funnel_analytics SET (security_invoker = true);

-- Verify that the underlying analytics_events table has proper RLS
-- (It already has admin-only SELECT policy from previous migrations)