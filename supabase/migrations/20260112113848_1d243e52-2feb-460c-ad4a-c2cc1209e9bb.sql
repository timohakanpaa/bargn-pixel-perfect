-- Fix get_funnel_cohort_analysis: Add SECURITY DEFINER and admin role check
-- This function currently allows any authenticated user to access cohort analytics data

CREATE OR REPLACE FUNCTION public.get_funnel_cohort_analysis(funnel_id_param uuid, cohort_type text, days_back integer DEFAULT 30)
 RETURNS TABLE(cohort_name text, total_entries bigint, completions bigint, completion_rate numeric, avg_time_to_complete numeric)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Check if user is admin
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  IF cohort_type = 'language' THEN
    RETURN QUERY
    SELECT 
      COALESCE(ae.language, 'Unknown') as cohort_name,
      COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1) as total_entries,
      COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true) as completions,
      ROUND(
        (COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true)::NUMERIC / 
         NULLIF(COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1), 0) * 100),
        2
      ) as completion_rate,
      ROUND(
        AVG(EXTRACT(EPOCH FROM (fp.completed_at - fp.created_at)) / 60)
        FILTER (WHERE fp.completed = true),
        2
      ) as avg_time_to_complete
    FROM public.funnel_progress fp
    LEFT JOIN public.analytics_events ae ON ae.session_id = fp.session_id
    WHERE fp.funnel_id = funnel_id_param
      AND fp.created_at >= NOW() - INTERVAL '1 day' * days_back
    GROUP BY ae.language
    HAVING COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1) > 0
    ORDER BY total_entries DESC;
    
  ELSIF cohort_type = 'device' THEN
    RETURN QUERY
    SELECT 
      CASE 
        WHEN ae.screen_width <= 768 THEN 'Mobile'
        WHEN ae.screen_width <= 1024 THEN 'Tablet'
        ELSE 'Desktop'
      END as cohort_name,
      COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1) as total_entries,
      COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true) as completions,
      ROUND(
        (COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true)::NUMERIC / 
         NULLIF(COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1), 0) * 100),
        2
      ) as completion_rate,
      ROUND(
        AVG(EXTRACT(EPOCH FROM (fp.completed_at - fp.created_at)) / 60)
        FILTER (WHERE fp.completed = true),
        2
      ) as avg_time_to_complete
    FROM public.funnel_progress fp
    LEFT JOIN public.analytics_events ae ON ae.session_id = fp.session_id
    WHERE fp.funnel_id = funnel_id_param
      AND fp.created_at >= NOW() - INTERVAL '1 day' * days_back
    GROUP BY 
      CASE 
        WHEN ae.screen_width <= 768 THEN 'Mobile'
        WHEN ae.screen_width <= 1024 THEN 'Tablet'
        ELSE 'Desktop'
      END
    HAVING COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1) > 0
    ORDER BY total_entries DESC;
    
  ELSIF cohort_type = 'referrer' THEN
    RETURN QUERY
    SELECT 
      CASE 
        WHEN ae.referrer IS NULL OR ae.referrer = '' THEN 'Direct'
        WHEN ae.referrer LIKE '%google%' THEN 'Google'
        WHEN ae.referrer LIKE '%facebook%' OR ae.referrer LIKE '%fb%' THEN 'Facebook'
        WHEN ae.referrer LIKE '%twitter%' OR ae.referrer LIKE '%t.co%' THEN 'Twitter'
        WHEN ae.referrer LIKE '%linkedin%' THEN 'LinkedIn'
        ELSE 'Other'
      END as cohort_name,
      COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1) as total_entries,
      COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true) as completions,
      ROUND(
        (COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true)::NUMERIC / 
         NULLIF(COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1), 0) * 100),
        2
      ) as completion_rate,
      ROUND(
        AVG(EXTRACT(EPOCH FROM (fp.completed_at - fp.created_at)) / 60)
        FILTER (WHERE fp.completed = true),
        2
      ) as avg_time_to_complete
    FROM public.funnel_progress fp
    LEFT JOIN public.analytics_events ae ON ae.session_id = fp.session_id
    WHERE fp.funnel_id = funnel_id_param
      AND fp.created_at >= NOW() - INTERVAL '1 day' * days_back
    GROUP BY 
      CASE 
        WHEN ae.referrer IS NULL OR ae.referrer = '' THEN 'Direct'
        WHEN ae.referrer LIKE '%google%' THEN 'Google'
        WHEN ae.referrer LIKE '%facebook%' OR ae.referrer LIKE '%fb%' THEN 'Facebook'
        WHEN ae.referrer LIKE '%twitter%' OR ae.referrer LIKE '%t.co%' THEN 'Twitter'
        WHEN ae.referrer LIKE '%linkedin%' THEN 'LinkedIn'
        ELSE 'Other'
      END
    HAVING COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1) > 0
    ORDER BY total_entries DESC;
    
  ELSIF cohort_type = 'time_period' THEN
    RETURN QUERY
    SELECT 
      TO_CHAR(DATE_TRUNC('week', fp.created_at), 'YYYY-MM-DD') || ' (Week)' as cohort_name,
      COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1) as total_entries,
      COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true) as completions,
      ROUND(
        (COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true)::NUMERIC / 
         NULLIF(COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1), 0) * 100),
        2
      ) as completion_rate,
      ROUND(
        AVG(EXTRACT(EPOCH FROM (fp.completed_at - fp.created_at)) / 60)
        FILTER (WHERE fp.completed = true),
        2
      ) as avg_time_to_complete
    FROM public.funnel_progress fp
    WHERE fp.funnel_id = funnel_id_param
      AND fp.created_at >= NOW() - INTERVAL '1 day' * days_back
    GROUP BY DATE_TRUNC('week', fp.created_at)
    HAVING COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1) > 0
    ORDER BY DATE_TRUNC('week', fp.created_at) DESC;
  END IF;
END;
$function$;

-- Revoke execute from anon, only allow authenticated and service_role
REVOKE EXECUTE ON FUNCTION public.get_funnel_cohort_analysis(uuid, text, integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.get_funnel_cohort_analysis(uuid, text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_funnel_cohort_analysis(uuid, text, integer) TO service_role;