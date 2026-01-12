-- Fix alert_logs security: Remove service role bypass policy
-- Service role inherently bypasses RLS, so explicit "true" policies are unnecessary and misleading
-- Keep only the strict admin-only policy

-- Drop the overly permissive service role policy
DROP POLICY IF EXISTS "Service role can manage alert logs" ON public.alert_logs;

-- Ensure we have strict admin-only policies
-- Drop and recreate to ensure clean state
DROP POLICY IF EXISTS "Only admins can view alert logs" ON public.alert_logs;
DROP POLICY IF EXISTS "Only admins can insert alert logs" ON public.alert_logs;
DROP POLICY IF EXISTS "Only admins can update alert logs" ON public.alert_logs;
DROP POLICY IF EXISTS "Only admins can delete alert logs" ON public.alert_logs;

-- Admin-only SELECT
CREATE POLICY "Only admins can view alert logs"
ON public.alert_logs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admin-only INSERT
CREATE POLICY "Only admins can insert alert logs"
ON public.alert_logs
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Admin-only UPDATE
CREATE POLICY "Only admins can update alert logs"
ON public.alert_logs
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Admin-only DELETE
CREATE POLICY "Only admins can delete alert logs"
ON public.alert_logs
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Force RLS to apply even for table owner
ALTER TABLE public.alert_logs FORCE ROW LEVEL SECURITY;