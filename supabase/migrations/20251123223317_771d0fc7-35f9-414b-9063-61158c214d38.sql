-- Drop the insecure public insert policy
DROP POLICY IF EXISTS "Allow public to insert analytics" ON public.analytics_events;

-- Drop the overly permissive service role read policy
DROP POLICY IF EXISTS "Allow service role to read analytics" ON public.analytics_events;

-- Create service role only policy for inserting analytics
CREATE POLICY "Service role can insert analytics"
ON public.analytics_events
FOR INSERT
TO service_role
WITH CHECK (true);

-- Create admin-only policy for reading analytics
CREATE POLICY "Admins can view analytics"
ON public.analytics_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Keep service role ability to read for backend operations
CREATE POLICY "Service role can view analytics"
ON public.analytics_events
FOR SELECT
TO service_role
USING (true);