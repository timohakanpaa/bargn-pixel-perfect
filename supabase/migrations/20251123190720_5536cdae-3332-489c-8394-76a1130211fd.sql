-- Fix security definer view by explicitly setting SECURITY INVOKER
DROP VIEW IF EXISTS public.chat_analytics_summary;

CREATE OR REPLACE VIEW public.chat_analytics_summary 
WITH (security_invoker = true) AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as total_messages,
  COUNT(DISTINCT session_id) as unique_sessions,
  AVG(response_time_ms) as avg_response_time_ms,
  COUNT(CASE WHEN error_occurred THEN 1 END) as error_count,
  language
FROM public.chat_analytics
GROUP BY DATE_TRUNC('day', created_at), language
ORDER BY date DESC;