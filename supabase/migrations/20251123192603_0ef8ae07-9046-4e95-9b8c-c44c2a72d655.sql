-- Create view for funnel analytics
CREATE OR REPLACE VIEW public.funnel_analytics 
WITH (security_invoker = true) AS
SELECT 
  f.id as funnel_id,
  f.name as funnel_name,
  f.steps,
  COUNT(DISTINCT fp.session_id) as total_entries,
  COUNT(DISTINCT CASE WHEN fp.completed = true THEN fp.session_id END) as completions,
  ROUND(
    (COUNT(DISTINCT CASE WHEN fp.completed = true THEN fp.session_id END)::NUMERIC / 
    NULLIF(COUNT(DISTINCT fp.session_id), 0) * 100), 2
  ) as completion_rate
FROM public.conversion_funnels f
LEFT JOIN public.funnel_progress fp ON f.id = fp.funnel_id
WHERE f.is_active = true
GROUP BY f.id, f.name, f.steps;

-- Create function to get funnel drop-off analysis
CREATE OR REPLACE FUNCTION public.get_funnel_dropoff(
  funnel_id_param UUID,
  days_back INTEGER DEFAULT 30
)
RETURNS TABLE (
  step_number INTEGER,
  step_name TEXT,
  sessions_reached BIGINT,
  sessions_continued BIGINT,
  drop_off_count BIGINT,
  drop_off_rate NUMERIC
)
LANGUAGE SQL
SECURITY INVOKER
STABLE
SET search_path = public
AS $$
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
$$;

-- Insert default funnels
INSERT INTO public.conversion_funnels (name, description, steps) VALUES
(
  'Member Signup Funnel',
  'Tracks user journey from homepage to member signup',
  '[
    {"step_number": 1, "step_name": "Homepage Visit", "page_path": "/", "event_type": "page_view"},
    {"step_number": 2, "step_name": "Members Page", "page_path": "/members", "event_type": "page_view"},
    {"step_number": 3, "step_name": "Pricing View", "page_path": "/members", "event_type": "scroll_to_pricing"},
    {"step_number": 4, "step_name": "Join Now Click", "page_path": "/members", "event_type": "button_click", "event_name": "join_now_click"}
  ]'::jsonb
),
(
  'Partner Signup Funnel',
  'Tracks business partner conversion journey',
  '[
    {"step_number": 1, "step_name": "Homepage Visit", "page_path": "/", "event_type": "page_view"},
    {"step_number": 2, "step_name": "Partners Page", "page_path": "/partners", "event_type": "page_view"},
    {"step_number": 3, "step_name": "View Benefits", "page_path": "/partners", "event_type": "scroll_to_benefits"},
    {"step_number": 4, "step_name": "Apply Now", "page_path": "/partners", "event_type": "button_click", "event_name": "apply_partner"}
  ]'::jsonb
),
(
  'Creator Campaign Funnel',
  'Tracks content creator to campaign signup',
  '[
    {"step_number": 1, "step_name": "Homepage Visit", "page_path": "/", "event_type": "page_view"},
    {"step_number": 2, "step_name": "Campaign Page", "page_path": "/campaign", "event_type": "page_view"},
    {"step_number": 3, "step_name": "View Revenue", "page_path": "/campaign", "event_type": "scroll_to_money"},
    {"step_number": 4, "step_name": "Start Campaign", "page_path": "/campaign", "event_type": "button_click", "event_name": "start_campaign"}
  ]'::jsonb
)
ON CONFLICT (name) DO NOTHING;