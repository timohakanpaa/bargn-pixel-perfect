-- Fix search_path for get_top_events function
DROP FUNCTION IF EXISTS public.get_top_events(TEXT, INTEGER, INTEGER);

CREATE OR REPLACE FUNCTION public.get_top_events(
  event_type_filter TEXT,
  days_back INTEGER DEFAULT 7,
  limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
  event_name TEXT,
  event_count BIGINT,
  unique_sessions BIGINT
)
LANGUAGE SQL
SECURITY INVOKER
STABLE
SET search_path = public
AS $$
  SELECT 
    event_name,
    COUNT(*) as event_count,
    COUNT(DISTINCT session_id) as unique_sessions
  FROM public.analytics_events
  WHERE 
    event_type = event_type_filter
    AND created_at >= NOW() - INTERVAL '1 day' * days_back
  GROUP BY event_name
  ORDER BY event_count DESC
  LIMIT limit_count;
$$;