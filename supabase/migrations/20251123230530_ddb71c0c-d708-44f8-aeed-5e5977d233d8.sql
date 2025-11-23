-- Remove public read access from analytics_events table
-- The service role only needs INSERT access for tracking, not SELECT
DROP POLICY IF EXISTS "Service role can view analytics" ON public.analytics_events;

-- Verify only admins can read analytics data
-- (Admins can view analytics policy already exists and is correct)