-- Drop the INSERT/UPDATE policies for service role (not needed)
DROP POLICY IF EXISTS "Service role can insert alert configurations" ON public.alert_configurations;
DROP POLICY IF EXISTS "Service role can update alert configurations" ON public.alert_configurations;

-- Service role needs SELECT access for the check-funnel-alerts edge function
CREATE POLICY "Service role can read alert configurations"
ON public.alert_configurations
FOR SELECT
TO service_role
USING (true);