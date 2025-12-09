-- Drop the overly permissive policy that allows ALL operations
DROP POLICY IF EXISTS "Service role can insert chat analytics" ON public.chat_analytics;

-- Create a proper INSERT-only policy for the service role/edge functions
-- This allows inserts from edge functions but prevents regular users from querying
CREATE POLICY "Allow insert for chat analytics"
ON public.chat_analytics
FOR INSERT
TO authenticated
WITH CHECK (true);