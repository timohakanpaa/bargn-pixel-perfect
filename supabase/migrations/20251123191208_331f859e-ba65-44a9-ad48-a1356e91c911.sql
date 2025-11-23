-- Create comprehensive analytics events table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id UUID NOT NULL,
  event_type TEXT NOT NULL, -- 'page_view', 'button_click', 'form_submit', 'navigation', etc.
  event_name TEXT NOT NULL, -- Specific event name like 'homepage_visit', 'cta_click'
  page_path TEXT,
  page_title TEXT,
  element_id TEXT,
  element_text TEXT,
  element_class TEXT,
  user_agent TEXT,
  language TEXT,
  referrer TEXT,
  metadata JSONB DEFAULT '{}'::jsonb, -- Additional custom data
  screen_width INTEGER,
  screen_height INTEGER
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON public.analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_page_path ON public.analytics_events(page_path);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert analytics (public tracking)
CREATE POLICY "Allow public to insert analytics"
  ON public.analytics_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy to allow service role to read all analytics
CREATE POLICY "Allow service role to read analytics"
  ON public.analytics_events
  FOR SELECT
  TO service_role
  USING (true);

-- Create views for common analytics queries
CREATE OR REPLACE VIEW public.analytics_page_views 
WITH (security_invoker = true) AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  page_path,
  page_title,
  COUNT(*) as views,
  COUNT(DISTINCT session_id) as unique_visitors
FROM public.analytics_events
WHERE event_type = 'page_view'
GROUP BY DATE_TRUNC('day', created_at), page_path, page_title
ORDER BY date DESC, views DESC;

CREATE OR REPLACE VIEW public.analytics_button_clicks 
WITH (security_invoker = true) AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  event_name,
  element_text,
  page_path,
  COUNT(*) as clicks,
  COUNT(DISTINCT session_id) as unique_users
FROM public.analytics_events
WHERE event_type = 'button_click'
GROUP BY DATE_TRUNC('day', created_at), event_name, element_text, page_path
ORDER BY date DESC, clicks DESC;

CREATE OR REPLACE VIEW public.analytics_navigation_flow 
WITH (security_invoker = true) AS
SELECT 
  session_id,
  page_path,
  page_title,
  created_at,
  LAG(page_path) OVER (PARTITION BY session_id ORDER BY created_at) as previous_page,
  LEAD(page_path) OVER (PARTITION BY session_id ORDER BY created_at) as next_page
FROM public.analytics_events
WHERE event_type = 'page_view'
ORDER BY session_id, created_at;

CREATE OR REPLACE VIEW public.analytics_daily_summary 
WITH (security_invoker = true) AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as total_events,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(CASE WHEN event_type = 'page_view' THEN 1 END) as page_views,
  COUNT(CASE WHEN event_type = 'button_click' THEN 1 END) as button_clicks,
  COUNT(CASE WHEN event_type = 'form_submit' THEN 1 END) as form_submissions,
  COUNT(CASE WHEN event_type = 'navigation' THEN 1 END) as navigation_events
FROM public.analytics_events
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- Create a function to get top events by type
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