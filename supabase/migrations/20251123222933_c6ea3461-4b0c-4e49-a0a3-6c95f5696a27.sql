-- Drop the existing overly permissive policies
DROP POLICY IF EXISTS "Allow service role to read chat analytics" ON public.chat_analytics;
DROP POLICY IF EXISTS "Allow service role to insert chat analytics" ON public.chat_analytics;

-- Create proper service role policies that actually check for service role
CREATE POLICY "Service role can insert chat analytics"
ON public.chat_analytics
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can read chat analytics"
ON public.chat_analytics
FOR SELECT
TO service_role
USING (true);