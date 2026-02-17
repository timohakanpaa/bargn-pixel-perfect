
-- Drop and recreate get_funnel_analytics with steps column
DROP FUNCTION IF EXISTS public.get_funnel_analytics();

CREATE OR REPLACE FUNCTION public.get_funnel_analytics()
RETURNS TABLE(funnel_id uuid, funnel_name text, steps jsonb, total_entries bigint, completions bigint, completion_rate numeric, avg_completion_time_minutes numeric)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  RETURN QUERY
  SELECT
    cf.id as funnel_id,
    cf.name as funnel_name,
    cf.steps as steps,
    COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1)::bigint as total_entries,
    COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true)::bigint as completions,
    ROUND(
      (COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true)::NUMERIC /
       NULLIF(COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1), 0) * 100),
      2
    ) as completion_rate,
    ROUND(
      AVG(EXTRACT(EPOCH FROM (fp.completed_at - fp.created_at)) / 60)
      FILTER (WHERE fp.completed = true),
      2
    ) as avg_completion_time_minutes
  FROM public.conversion_funnels cf
  LEFT JOIN public.funnel_progress fp ON cf.id = fp.funnel_id
  GROUP BY cf.id, cf.name, cf.steps;
END;
$$;
