-- Create analytics views for reporting dashboards

-- Analytics Daily Summary View
CREATE OR REPLACE VIEW analytics_daily_summary AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_events,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(*) FILTER (WHERE event_type = 'page_view') as page_views,
  COUNT(*) FILTER (WHERE event_type = 'click') as clicks,
  COUNT(*) FILTER (WHERE event_type = 'form_submit') as conversions,
  ROUND(AVG(screen_width)::numeric, 0) as avg_screen_width
FROM analytics_events
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Analytics Page Views
CREATE OR REPLACE VIEW analytics_page_views AS
SELECT 
  DATE(created_at) as date,
  page_path,
  page_title,
  COUNT(*) as views,
  COUNT(DISTINCT session_id) as unique_visitors
FROM analytics_events
WHERE event_type = 'page_view'
GROUP BY DATE(created_at), page_path, page_title
ORDER BY date DESC, views DESC;

-- Analytics Button Clicks
CREATE OR REPLACE VIEW analytics_button_clicks AS
SELECT 
  DATE(created_at) as date,
  event_name,
  element_text,
  page_path,
  COUNT(*) as click_count,
  COUNT(DISTINCT session_id) as unique_users
FROM analytics_events
WHERE event_type = 'click'
GROUP BY DATE(created_at), event_name, element_text, page_path
ORDER BY date DESC, click_count DESC;

-- Chat Analytics Summary
CREATE OR REPLACE VIEW chat_analytics_summary AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_messages,
  COUNT(DISTINCT session_id) as unique_sessions,
  ROUND(AVG(response_time_ms)::numeric, 0) as avg_response_time_ms,
  COUNT(*) FILTER (WHERE error_occurred = true) as error_count,
  ROUND((COUNT(*) FILTER (WHERE error_occurred = false)::numeric / NULLIF(COUNT(*), 0) * 100), 2) as success_rate
FROM chat_analytics
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Funnel Analytics View
CREATE OR REPLACE VIEW funnel_analytics AS
SELECT 
  cf.id as funnel_id,
  cf.name as funnel_name,
  COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1) as total_entries,
  COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true) as completions,
  ROUND(
    (COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.completed = true)::numeric / 
     NULLIF(COUNT(DISTINCT fp.session_id) FILTER (WHERE fp.current_step = 1), 0) * 100),
    2
  ) as completion_rate,
  ROUND(
    AVG(EXTRACT(EPOCH FROM (fp.completed_at - fp.created_at)) / 60)
    FILTER (WHERE fp.completed = true)::numeric,
    2
  ) as avg_completion_time_minutes
FROM conversion_funnels cf
LEFT JOIN funnel_progress fp ON cf.id = fp.funnel_id
WHERE cf.is_active = true
GROUP BY cf.id, cf.name
ORDER BY cf.name;