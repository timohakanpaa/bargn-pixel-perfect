-- Drop the current INSERT policy that allows any authenticated user
DROP POLICY IF EXISTS "Allow insert for chat analytics" ON public.chat_analytics;

-- Create a restrictive INSERT policy that only allows service role
-- Edge functions use service_role key, so they can still insert
-- But regular authenticated users cannot insert fake data
CREATE POLICY "Service role only insert for chat analytics"
ON public.chat_analytics
FOR INSERT
TO service_role
WITH CHECK (true);