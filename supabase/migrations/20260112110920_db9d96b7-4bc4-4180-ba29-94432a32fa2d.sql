-- Fix security vulnerability: Remove public access to analytics_events
-- Only admins should be able to view analytics data

-- Drop any existing public/anon policies on analytics_events
DROP POLICY IF EXISTS "Allow public read access" ON public.analytics_events;
DROP POLICY IF EXISTS "Public can view analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Anyone can view analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Allow public select" ON public.analytics_events;

-- Ensure only admins can view analytics events (policy may already exist, recreate to be safe)
DROP POLICY IF EXISTS "Only admins can view analytics" ON public.analytics_events;
CREATE POLICY "Only admins can view analytics"
ON public.analytics_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix security vulnerability: Remove public access to user_roles
-- Only authenticated users should see their own roles, admins can see all

-- Drop any existing public policies on user_roles
DROP POLICY IF EXISTS "Allow public read access" ON public.user_roles;
DROP POLICY IF EXISTS "Public can view roles" ON public.user_roles;
DROP POLICY IF EXISTS "Anyone can view roles" ON public.user_roles;
DROP POLICY IF EXISTS "Allow public select" ON public.user_roles;

-- Drop and recreate user_roles policies properly
DROP POLICY IF EXISTS "Users can view own role" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Users can only view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Admins can view all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admins can manage (insert/update/delete) all roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));