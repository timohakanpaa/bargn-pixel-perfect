-- Drop the overly permissive public read policy
DROP POLICY IF EXISTS "Allow public read access to active funnels" ON public.conversion_funnels;

-- Create admin-only read policy
CREATE POLICY "Admins can view funnels" 
ON public.conversion_funnels 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));