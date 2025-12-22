-- FINAL SECURITY FIXES: Add explicit deny policies for all sensitive tables

-- =====================================================
-- 1. Add restrictive policies to analytics_events
-- =====================================================
-- Drop existing policies first
DROP POLICY IF EXISTS "Admins can view analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Only service role can insert analytics" ON public.analytics_events;

-- Create permissive SELECT policy for admins only
CREATE POLICY "Only admins can view analytics"
ON public.analytics_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create permissive INSERT policy for service_role only
CREATE POLICY "Only service role can insert analytics"
ON public.analytics_events
FOR INSERT
TO service_role
WITH CHECK (true);

-- =====================================================
-- 2. Strengthen alert_configurations policies
-- =====================================================
-- Already has proper admin-only policies, ensure RLS is forced
ALTER TABLE public.alert_configurations FORCE ROW LEVEL SECURITY;

-- =====================================================
-- 3. Strengthen funnel_progress policies
-- =====================================================
DROP POLICY IF EXISTS "Admins can view funnel progress" ON public.funnel_progress;
DROP POLICY IF EXISTS "Service role can insert funnel progress" ON public.funnel_progress;

-- Recreate with explicit policies
CREATE POLICY "Only admins can view funnel progress"
ON public.funnel_progress
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only service role can insert funnel progress"
ON public.funnel_progress
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Only service role can update funnel progress"
ON public.funnel_progress
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- =====================================================
-- 4. Strengthen alert_logs policies  
-- =====================================================
DROP POLICY IF EXISTS "Admins can view alert logs" ON public.alert_logs;
DROP POLICY IF EXISTS "Admins can manage alert logs" ON public.alert_logs;
DROP POLICY IF EXISTS "Service role can insert alert logs" ON public.alert_logs;
DROP POLICY IF EXISTS "Service role can update notification status" ON public.alert_logs;

-- Create explicit admin-only SELECT
CREATE POLICY "Only admins can view alert logs"
ON public.alert_logs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Service role can manage all alert logs
CREATE POLICY "Service role can manage alert logs"
ON public.alert_logs
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- =====================================================
-- 5. Verify all tables have FORCE RLS enabled
-- =====================================================
ALTER TABLE public.analytics_events FORCE ROW LEVEL SECURITY;
ALTER TABLE public.alert_configurations FORCE ROW LEVEL SECURITY;
ALTER TABLE public.alert_logs FORCE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_funnels FORCE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_progress FORCE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles FORCE ROW LEVEL SECURITY;