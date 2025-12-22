-- FINAL SECURITY FIX: Add explicit deny policies for INSERT/UPDATE/DELETE
-- These block all direct access - only SECURITY DEFINER functions can insert

-- =====================================================
-- 1. analytics_events - Block all direct modifications
-- =====================================================
-- No one can INSERT directly (SECURITY DEFINER function bypasses this)
CREATE POLICY "Block direct inserts to analytics"
ON public.analytics_events
FOR INSERT
TO authenticated, anon
WITH CHECK (false);

-- No one can UPDATE analytics events
CREATE POLICY "Block updates to analytics"
ON public.analytics_events
FOR UPDATE
TO authenticated, anon
USING (false)
WITH CHECK (false);

-- No one can DELETE analytics events (except admins)
CREATE POLICY "Only admins can delete analytics"
ON public.analytics_events
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- =====================================================
-- 2. funnel_progress - Block all direct modifications
-- =====================================================
-- No one can INSERT directly (SECURITY DEFINER function bypasses this)
CREATE POLICY "Block direct inserts to funnel progress"
ON public.funnel_progress
FOR INSERT
TO authenticated, anon
WITH CHECK (false);

-- No one can UPDATE funnel progress directly
CREATE POLICY "Block updates to funnel progress"
ON public.funnel_progress
FOR UPDATE
TO authenticated, anon
USING (false)
WITH CHECK (false);

-- No one can DELETE funnel progress (except admins)
CREATE POLICY "Only admins can delete funnel progress"
ON public.funnel_progress
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- =====================================================
-- 3. Ensure all secure functions are properly configured
-- =====================================================
-- The SECURITY DEFINER attribute on insert_analytics_event and 
-- insert_funnel_progress means they execute with the function owner's
-- privileges (postgres), bypassing RLS. This is the correct pattern.

-- Verify RLS is forced on all tables
ALTER TABLE public.analytics_events FORCE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_progress FORCE ROW LEVEL SECURITY;
ALTER TABLE public.alert_configurations FORCE ROW LEVEL SECURITY;
ALTER TABLE public.alert_logs FORCE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_funnels FORCE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles FORCE ROW LEVEL SECURITY;