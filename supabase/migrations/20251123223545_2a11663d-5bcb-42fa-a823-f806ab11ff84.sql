-- Drop the insecure public insert policy on funnel_progress
DROP POLICY IF EXISTS "Allow public to insert funnel progress" ON public.funnel_progress;

-- Service role can already insert via existing policy
-- Just ensure we have proper admin read access
CREATE POLICY "Admins can view funnel progress"
ON public.funnel_progress
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));