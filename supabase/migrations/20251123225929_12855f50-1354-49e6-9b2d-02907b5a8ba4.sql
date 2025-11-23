-- Drop the overly permissive service role policy on alert_logs
DROP POLICY IF EXISTS "Allow service role full access to alert logs" ON public.alert_logs;

-- Service role can only INSERT new alert logs (no reading historical data)
CREATE POLICY "Service role can insert alert logs"
ON public.alert_logs
FOR INSERT
TO service_role
WITH CHECK (true);

-- Service role can UPDATE notification status (for marking emails as sent)
CREATE POLICY "Service role can update notification status"
ON public.alert_logs
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);