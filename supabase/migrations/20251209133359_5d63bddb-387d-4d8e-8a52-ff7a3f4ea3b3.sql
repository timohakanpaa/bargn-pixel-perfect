-- Drop existing restrictive policies on alert_configurations
DROP POLICY IF EXISTS "Admins can view alert configurations" ON public.alert_configurations;
DROP POLICY IF EXISTS "Admins can insert alert configurations" ON public.alert_configurations;
DROP POLICY IF EXISTS "Admins can update alert configurations" ON public.alert_configurations;
DROP POLICY IF EXISTS "Admins can delete alert configurations" ON public.alert_configurations;

-- Create permissive admin-only policies
CREATE POLICY "Admins can view alert configurations"
ON public.alert_configurations FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert alert configurations"
ON public.alert_configurations FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update alert configurations"
ON public.alert_configurations FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete alert configurations"
ON public.alert_configurations FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));