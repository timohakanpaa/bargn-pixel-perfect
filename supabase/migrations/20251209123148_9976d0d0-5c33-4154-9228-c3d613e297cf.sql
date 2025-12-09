-- Drop existing policies on alert_configurations
DROP POLICY IF EXISTS "Admins can view alert configurations" ON public.alert_configurations;
DROP POLICY IF EXISTS "Admins can manage alert configurations" ON public.alert_configurations;

-- Ensure RLS is enabled and forced
ALTER TABLE public.alert_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_configurations FORCE ROW LEVEL SECURITY;

-- Create proper PERMISSIVE policies for admin-only access
CREATE POLICY "Admins can view alert configurations"
ON public.alert_configurations
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert alert configurations"
ON public.alert_configurations
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update alert configurations"
ON public.alert_configurations
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete alert configurations"
ON public.alert_configurations
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));