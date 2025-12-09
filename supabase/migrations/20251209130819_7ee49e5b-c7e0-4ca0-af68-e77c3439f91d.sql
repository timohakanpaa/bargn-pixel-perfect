-- Drop existing restrictive policies on chat_analytics
DROP POLICY IF EXISTS "Service role can insert chat analytics" ON public.chat_analytics;
DROP POLICY IF EXISTS "Admins can view chat analytics" ON public.chat_analytics;

-- Create permissive policies targeting authenticated role
CREATE POLICY "Admins can view chat analytics"
ON public.chat_analytics
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can insert chat analytics"
ON public.chat_analytics
FOR INSERT
TO authenticated
WITH CHECK (true);