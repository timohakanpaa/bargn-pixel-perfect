-- Block anonymous/public access completely on sensitive tables
-- The issue is that we need explicit DENY policies for anon role

-- analytics_events: Block anon access explicitly
CREATE POLICY "Block anon access to analytics"
ON public.analytics_events
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- funnel_progress: Block anon access explicitly
CREATE POLICY "Block anon access to funnel_progress"
ON public.funnel_progress
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- conversion_funnels: Remove the permissive "authenticated users can view" policy
-- Only admins should see funnel strategy
DROP POLICY IF EXISTS "Authenticated users can view active funnels" ON public.conversion_funnels;

-- Block anon access to conversion_funnels
CREATE POLICY "Block anon access to conversion_funnels"
ON public.conversion_funnels
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- alert_configurations: Already has proper ownership-based policies, just block anon
CREATE POLICY "Block anon access to alert_configurations"
ON public.alert_configurations
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- alert_logs: Block anon access
CREATE POLICY "Block anon access to alert_logs"
ON public.alert_logs
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- user_roles: Block anon access
CREATE POLICY "Block anon access to user_roles"
ON public.user_roles
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Ensure FORCE ROW LEVEL SECURITY on all sensitive tables
ALTER TABLE public.analytics_events FORCE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_progress FORCE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_funnels FORCE ROW LEVEL SECURITY;
ALTER TABLE public.alert_configurations FORCE ROW LEVEL SECURITY;
ALTER TABLE public.alert_logs FORCE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles FORCE ROW LEVEL SECURITY;