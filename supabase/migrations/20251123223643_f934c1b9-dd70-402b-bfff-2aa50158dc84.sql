-- Drop any public insert policies on chat_analytics (if they exist)
DROP POLICY IF EXISTS "Allow public to insert chat analytics" ON public.chat_analytics;

-- Ensure only service role can insert chat analytics
-- (This policy should already exist from earlier, but we'll recreate it to be sure)
DROP POLICY IF EXISTS "Service role can insert chat analytics" ON public.chat_analytics;
CREATE POLICY "Service role can insert chat analytics"
ON public.chat_analytics
FOR INSERT
TO service_role
WITH CHECK (true);

-- Ensure only service role and admins can read chat analytics
DROP POLICY IF EXISTS "Service role can read chat analytics" ON public.chat_analytics;
CREATE POLICY "Service role can read chat analytics"
ON public.chat_analytics
FOR SELECT
TO service_role
USING (true);

CREATE POLICY "Admins can view chat analytics"
ON public.chat_analytics
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));