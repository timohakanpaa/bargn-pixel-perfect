-- Fix analytics_events RLS to prevent anonymous users from inserting fake data

-- First, drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Service role can insert analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Admins can view analytics" ON public.analytics_events;

-- Create PERMISSIVE policy for admins to SELECT (required for restrictive policies to work)
CREATE POLICY "Admins can view analytics"
ON public.analytics_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create PERMISSIVE policy for service_role to INSERT
-- This explicitly only allows the service_role to insert, blocking anon and authenticated users
CREATE POLICY "Only service role can insert analytics"
ON public.analytics_events
FOR INSERT
TO service_role
WITH CHECK (true);

-- Also add a policy to allow anon role to insert but ONLY via service_role key
-- This is handled by the above policy - anon users cannot insert directly

-- Ensure RLS is enabled (should already be, but confirm)
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owner as well (extra security)
ALTER TABLE public.analytics_events FORCE ROW LEVEL SECURITY;