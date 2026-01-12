-- Add explicit RESTRICTIVE SELECT policies to ensure non-admin authenticated users cannot read sensitive tables
-- These policies act as additional safeguards alongside existing admin-only PERMISSIVE policies

-- analytics_events: Explicitly restrict SELECT to admins only
DROP POLICY IF EXISTS "Restrict analytics select to admins" ON public.analytics_events;
CREATE POLICY "Restrict analytics select to admins"
ON public.analytics_events
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- funnel_progress: Explicitly restrict SELECT to admins only
DROP POLICY IF EXISTS "Restrict funnel progress select to admins" ON public.funnel_progress;
CREATE POLICY "Restrict funnel progress select to admins"
ON public.funnel_progress
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- alert_logs: Explicitly restrict SELECT to admins only
DROP POLICY IF EXISTS "Restrict alert logs select to admins" ON public.alert_logs;
CREATE POLICY "Restrict alert logs select to admins"
ON public.alert_logs
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- conversion_funnels: Explicitly restrict SELECT to admins only  
DROP POLICY IF EXISTS "Restrict funnels select to admins" ON public.conversion_funnels;
CREATE POLICY "Restrict funnels select to admins"
ON public.conversion_funnels
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));