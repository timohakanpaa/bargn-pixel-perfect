-- Create function to get cohort-based funnel analytics
CREATE OR REPLACE FUNCTION public.get_funnel_cohort_analysis(
  funnel_id_param UUID,
  cohort_type TEXT, -- 'language', 'device', 'referrer', 'time_period'
  days_back INTEGER DEFAULT 30
)
RETURNS TABLE(
  cohort_name TEXT,
  total_entries BIGINT,
  completions BIGINT,
  completion_rate NUMERIC,
  avg_time_to_complete NUMERIC
) 
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $$
BEGIN
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
$$;