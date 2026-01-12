-- Fix get_funnel_dropoff: Add SECURITY DEFINER and admin role check
-- This function currently allows any authenticated user to access drop-off data

CREATE OR REPLACE FUNCTION public.get_funnel_dropoff(funnel_id_param uuid, days_back integer DEFAULT 30)
 RETURNS TABLE(step_number integer, step_name text, sessions_reached bigint, sessions_continued bigint, drop_off_count bigint, drop_off_rate numeric)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Check if user is admin
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  RETURN QUERY
  WITH funnel_steps AS (
    SELECT 
      cf.id as funnel_id,
      (jsonb_array_elements(cf.steps)->>'step_number')::INTEGER as step_num,
      jsonb_array_elements(cf.steps)->>'step_name' as step_name
    FROM public.conversion_funnels cf
    WHERE cf.id = funnel_id_param
  ),
  step_sessions AS (
    SELECT 
      fp.current_step,
      COUNT(DISTINCT fp.session_id) as sessions_at_step
    FROM public.funnel_progress fp
    WHERE 
      fp.funnel_id = funnel_id_param
      AND fp.created_at >= NOW() - INTERVAL '1 day' * days_back
    GROUP BY fp.current_step
  )
  SELECT 
    fs.step_num as step_number,
    fs.step_name,
    COALESCE(ss.sessions_at_step, 0) as sessions_reached,
    COALESCE(LAG(ss.sessions_at_step) OVER (ORDER BY fs.step_num DESC), 0) as sessions_continued,
    COALESCE(ss.sessions_at_step, 0) - COALESCE(LAG(ss.sessions_at_step) OVER (ORDER BY fs.step_num DESC), 0) as drop_off_count,
    CASE 
      WHEN ss.sessions_at_step > 0 THEN
        ROUND(
          ((COALESCE(ss.sessions_at_step, 0) - COALESCE(LAG(ss.sessions_at_step) OVER (ORDER BY fs.step_num DESC), 0))::NUMERIC / 
          ss.sessions_at_step * 100), 2
        )
      ELSE 0
    END as drop_off_rate
  FROM funnel_steps fs
  LEFT JOIN step_sessions ss ON fs.step_num = ss.current_step
  ORDER BY fs.step_num;
END;
$function$;

-- Revoke execute from anon, only allow authenticated and service_role
REVOKE EXECUTE ON FUNCTION public.get_funnel_dropoff(uuid, integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.get_funnel_dropoff(uuid, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_funnel_dropoff(uuid, integer) TO service_role;