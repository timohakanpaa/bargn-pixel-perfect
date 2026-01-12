-- Ensure explicit blocking for public role (unauthenticated) on sensitive tables
-- The 'public' role is the default PostgreSQL role that all connections inherit from

-- Block public role access to analytics_events
DROP POLICY IF EXISTS "Block public access to analytics" ON public.analytics_events;
CREATE POLICY "Block public access to analytics"
ON public.analytics_events
AS RESTRICTIVE
FOR ALL
TO public
USING (auth.uid() IS NOT NULL);

-- Block public role access to user_roles  
DROP POLICY IF EXISTS "Block public access to user_roles" ON public.user_roles;
CREATE POLICY "Block public access to user_roles"
ON public.user_roles
AS RESTRICTIVE
FOR ALL
TO public
USING (auth.uid() IS NOT NULL);

-- Block public role access to alert_configurations
DROP POLICY IF EXISTS "Block public access to alert_configurations" ON public.alert_configurations;
CREATE POLICY "Block public access to alert_configurations"
ON public.alert_configurations
AS RESTRICTIVE
FOR ALL
TO public
USING (auth.uid() IS NOT NULL);

-- Block public role access to alert_logs
DROP POLICY IF EXISTS "Block public access to alert_logs" ON public.alert_logs;
CREATE POLICY "Block public access to alert_logs"
ON public.alert_logs
AS RESTRICTIVE
FOR ALL
TO public
USING (auth.uid() IS NOT NULL);

-- Block public role access to funnel_progress
DROP POLICY IF EXISTS "Block public access to funnel_progress" ON public.funnel_progress;
CREATE POLICY "Block public access to funnel_progress"
ON public.funnel_progress
AS RESTRICTIVE
FOR ALL
TO public
USING (auth.uid() IS NOT NULL);

-- Block public role access to conversion_funnels
DROP POLICY IF EXISTS "Block public access to conversion_funnels" ON public.conversion_funnels;
CREATE POLICY "Block public access to conversion_funnels"
ON public.conversion_funnels
AS RESTRICTIVE
FOR ALL
TO public
USING (auth.uid() IS NOT NULL);