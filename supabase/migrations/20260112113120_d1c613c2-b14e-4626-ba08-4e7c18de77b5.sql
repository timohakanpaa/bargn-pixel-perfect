-- Fix analytics_events: Add PERMISSIVE policy for admins
-- The current policies are all blocking, we need a permissive one to allow admin access

-- Drop the existing admin SELECT policy and recreate as PERMISSIVE
DROP POLICY IF EXISTS "Only admins can view analytics" ON public.analytics_events;

-- Create PERMISSIVE SELECT policy for admins
CREATE POLICY "Admins can view analytics"
ON public.analytics_events
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Also fix funnel_progress with same pattern
DROP POLICY IF EXISTS "Only admins can view funnel progress" ON public.funnel_progress;

CREATE POLICY "Admins can view funnel progress"
ON public.funnel_progress
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix alert_logs with same pattern
DROP POLICY IF EXISTS "Only admins can view alert logs" ON public.alert_logs;

CREATE POLICY "Admins can view alert logs"
ON public.alert_logs
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));