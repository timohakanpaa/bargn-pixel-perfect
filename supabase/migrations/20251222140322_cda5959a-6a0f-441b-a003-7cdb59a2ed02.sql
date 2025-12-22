-- Fix 1: Update alert_configurations policies to remove NULL access (prevents email exposure)
DROP POLICY IF EXISTS "Users can view own alert configurations" ON public.alert_configurations;
DROP POLICY IF EXISTS "Users can update own alert configurations" ON public.alert_configurations;
DROP POLICY IF EXISTS "Users can delete own alert configurations" ON public.alert_configurations;

-- Recreate policies WITHOUT NULL access - users can only see their own configurations
CREATE POLICY "Users can view own alert configurations"
ON public.alert_configurations
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND created_by = auth.uid()
);

CREATE POLICY "Users can update own alert configurations"
ON public.alert_configurations
FOR UPDATE
USING (
  auth.uid() IS NOT NULL 
  AND created_by = auth.uid()
)
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND created_by = auth.uid()
);

CREATE POLICY "Users can delete own alert configurations"
ON public.alert_configurations
FOR DELETE
USING (
  auth.uid() IS NOT NULL 
  AND created_by = auth.uid()
);

-- Add admin access policy for alert_configurations (admins can manage all)
CREATE POLICY "Admins can manage all alert configurations"
ON public.alert_configurations
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix 2: Add explicit PERMISSIVE SELECT policies for public funnel data (needed for analytics tracking)
-- The conversion_funnels table needs to be readable for funnel tracking to work
DROP POLICY IF EXISTS "Service role full access to funnels" ON public.conversion_funnels;

-- Allow public read of active funnels for tracking purposes (no sensitive data exposed)
CREATE POLICY "Anyone can view active funnels"
ON public.conversion_funnels
FOR SELECT
USING (is_active = true);

-- Only admins can modify funnels
CREATE POLICY "Service role and admins can manage funnels"
ON public.conversion_funnels
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix 3: Update can_access_alert_config function to remove NULL check
CREATE OR REPLACE FUNCTION public.can_access_alert_config(config_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.alert_configurations
    WHERE id = config_id
    AND created_by = auth.uid()
  ) OR public.has_role(auth.uid(), 'admin'::app_role)
$$;