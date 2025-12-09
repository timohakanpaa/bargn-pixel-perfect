-- Drop the chat_analytics_summary view first (depends on chat_analytics)
DROP VIEW IF EXISTS public.chat_analytics_summary;

-- Drop the chat_analytics table
DROP TABLE IF EXISTS public.chat_analytics;