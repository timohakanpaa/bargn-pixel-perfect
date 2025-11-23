-- Drop the overly permissive service role policy on alert_configurations
DROP POLICY IF EXISTS "Allow service role full access to alert configurations" ON public.alert_configurations;

-- Service role can only INSERT new alert configurations
CREATE POLICY "Service role can insert alert configurations"
ON public.alert_configurations
FOR INSERT
TO service_role
WITH CHECK (true);

-- Service role can only UPDATE existing alert configurations
CREATE POLICY "Service role can update alert configurations"
ON public.alert_configurations
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);