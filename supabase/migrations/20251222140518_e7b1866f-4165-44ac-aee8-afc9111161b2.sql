-- Remove public access to conversion_funnels - restrict to authenticated users only
DROP POLICY IF EXISTS "Anyone can view active funnels" ON public.conversion_funnels;

-- Only authenticated users can view active funnels (needed for funnel tracking)
CREATE POLICY "Authenticated users can view active funnels"
ON public.conversion_funnels
FOR SELECT
USING (auth.uid() IS NOT NULL AND is_active = true);