-- Fix analytics_events security: Ensure complete lockdown
-- The issue is that policies need to be RESTRICTIVE and cover all roles

-- First, drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Block direct inserts to analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Block updates to analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Only admins can delete analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Only admins can view analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Allow public read access" ON public.analytics_events;
DROP POLICY IF EXISTS "Public can view analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Anyone can view analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Allow public select" ON public.analytics_events;

-- Revoke all direct access from public and anon roles
REVOKE ALL ON public.analytics_events FROM anon;
REVOKE ALL ON public.analytics_events FROM public;

-- Grant only to authenticated (policies will further restrict)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.analytics_events TO authenticated;

-- Create RESTRICTIVE policies that deny by default
-- Only admins can SELECT
CREATE POLICY "Only admins can view analytics"
ON public.analytics_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Block all direct inserts (must use SECURITY DEFINER function)
CREATE POLICY "Block direct inserts to analytics"
ON public.analytics_events
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Block all updates
CREATE POLICY "Block updates to analytics"
ON public.analytics_events
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

-- Only admins can delete
CREATE POLICY "Only admins can delete analytics"
ON public.analytics_events
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Force RLS to apply even to table owner
ALTER TABLE public.analytics_events FORCE ROW LEVEL SECURITY;

-- Also fix user_roles table - remove overly permissive service role policy
DROP POLICY IF EXISTS "Service role can manage all roles" ON public.user_roles;

-- Fix funnel_progress similarly
DROP POLICY IF EXISTS "Service role can manage funnel progress" ON public.funnel_progress;

-- Ensure funnel_progress has proper policies
DROP POLICY IF EXISTS "Block direct inserts to funnel progress" ON public.funnel_progress;
DROP POLICY IF EXISTS "Block updates to funnel progress" ON public.funnel_progress;
DROP POLICY IF EXISTS "Only admins can delete funnel progress" ON public.funnel_progress;
DROP POLICY IF EXISTS "Only admins can view funnel progress" ON public.funnel_progress;

-- Revoke anon access from funnel_progress
REVOKE ALL ON public.funnel_progress FROM anon;
REVOKE ALL ON public.funnel_progress FROM public;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.funnel_progress TO authenticated;

-- Recreate funnel_progress policies
CREATE POLICY "Only admins can view funnel progress"
ON public.funnel_progress
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Block direct inserts to funnel progress"
ON public.funnel_progress
FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "Block updates to funnel progress"
ON public.funnel_progress
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Only admins can delete funnel progress"
ON public.funnel_progress
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

ALTER TABLE public.funnel_progress FORCE ROW LEVEL SECURITY;