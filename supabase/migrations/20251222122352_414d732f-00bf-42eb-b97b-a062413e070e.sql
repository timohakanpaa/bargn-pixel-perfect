-- COMPREHENSIVE SECURITY FIX: Restrict analytics inserts to validated edge function only

-- =====================================================
-- 1. Create a secure function to insert analytics (bypasses RLS)
-- =====================================================
CREATE OR REPLACE FUNCTION public.insert_analytics_event(
  p_session_id uuid,
  p_event_type text,
  p_event_name text,
  p_page_path text DEFAULT NULL,
  p_page_title text DEFAULT NULL,
  p_element_id text DEFAULT NULL,
  p_element_class text DEFAULT NULL,
  p_element_text text DEFAULT NULL,
  p_referrer text DEFAULT NULL,
  p_language text DEFAULT NULL,
  p_screen_width integer DEFAULT NULL,
  p_screen_height integer DEFAULT NULL,
  p_user_agent text DEFAULT NULL,
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  -- Input validation
  IF p_session_id IS NULL THEN
    RAISE EXCEPTION 'session_id is required';
  END IF;
  
  IF p_event_type IS NULL OR length(p_event_type) > 50 THEN
    RAISE EXCEPTION 'event_type is required and must be <= 50 characters';
  END IF;
  
  IF p_event_name IS NULL OR length(p_event_name) > 100 THEN
    RAISE EXCEPTION 'event_name is required and must be <= 100 characters';
  END IF;
  
  -- Validate other fields
  IF p_page_path IS NOT NULL AND length(p_page_path) > 500 THEN
    RAISE EXCEPTION 'page_path must be <= 500 characters';
  END IF;
  
  IF p_page_title IS NOT NULL AND length(p_page_title) > 200 THEN
    RAISE EXCEPTION 'page_title must be <= 200 characters';
  END IF;
  
  -- Insert the event
  INSERT INTO public.analytics_events (
    session_id,
    event_type,
    event_name,
    page_path,
    page_title,
    element_id,
    element_class,
    element_text,
    referrer,
    language,
    screen_width,
    screen_height,
    user_agent,
    metadata
  ) VALUES (
    p_session_id,
    p_event_type,
    p_event_name,
    p_page_path,
    p_page_title,
    p_element_id,
    p_element_class,
    p_element_text,
    p_referrer,
    p_language,
    p_screen_width,
    p_screen_height,
    p_user_agent,
    COALESCE(p_metadata, '{}'::jsonb)
  )
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$;

-- Create secure function to insert funnel progress
CREATE OR REPLACE FUNCTION public.insert_funnel_progress(
  p_session_id uuid,
  p_funnel_id uuid,
  p_current_step integer,
  p_completed boolean DEFAULT false,
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  -- Input validation
  IF p_session_id IS NULL THEN
    RAISE EXCEPTION 'session_id is required';
  END IF;
  
  IF p_funnel_id IS NULL THEN
    RAISE EXCEPTION 'funnel_id is required';
  END IF;
  
  IF p_current_step IS NULL OR p_current_step < 1 THEN
    RAISE EXCEPTION 'current_step must be a positive integer';
  END IF;
  
  -- Insert the funnel progress
  INSERT INTO public.funnel_progress (
    session_id,
    funnel_id,
    current_step,
    completed,
    completed_at,
    metadata
  ) VALUES (
    p_session_id,
    p_funnel_id,
    p_current_step,
    COALESCE(p_completed, false),
    CASE WHEN p_completed THEN now() ELSE NULL END,
    COALESCE(p_metadata, '{}'::jsonb)
  )
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$;

-- =====================================================
-- 2. Grant execute permissions only to service_role
-- =====================================================
REVOKE EXECUTE ON FUNCTION public.insert_analytics_event FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.insert_analytics_event FROM anon;
REVOKE EXECUTE ON FUNCTION public.insert_analytics_event FROM authenticated;
GRANT EXECUTE ON FUNCTION public.insert_analytics_event TO service_role;

REVOKE EXECUTE ON FUNCTION public.insert_funnel_progress FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.insert_funnel_progress FROM anon;
REVOKE EXECUTE ON FUNCTION public.insert_funnel_progress FROM authenticated;
GRANT EXECUTE ON FUNCTION public.insert_funnel_progress TO service_role;

-- =====================================================
-- 3. Remove direct INSERT policies from tables
-- =====================================================
DROP POLICY IF EXISTS "Only service role can insert analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Only service role can insert funnel progress" ON public.funnel_progress;
DROP POLICY IF EXISTS "Only service role can update funnel progress" ON public.funnel_progress;

-- The SECURITY DEFINER functions will bypass RLS, so no INSERT policies needed
-- This means direct inserts are blocked, only the functions can insert

-- =====================================================
-- 4. Ensure all tables have proper security settings
-- =====================================================
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events FORCE ROW LEVEL SECURITY;

ALTER TABLE public.funnel_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_progress FORCE ROW LEVEL SECURITY;