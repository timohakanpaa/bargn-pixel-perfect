-- Create chat_analytics table to track user interactions
CREATE TABLE IF NOT EXISTS public.chat_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id UUID NOT NULL,
  user_message TEXT NOT NULL,
  ai_response TEXT,
  language TEXT,
  response_time_ms INTEGER,
  error_occurred BOOLEAN DEFAULT FALSE,
  error_message TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_analytics_created_at ON public.chat_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_analytics_session_id ON public.chat_analytics(session_id);

-- Enable RLS
ALTER TABLE public.chat_analytics ENABLE ROW LEVEL SECURITY;

-- Policy to allow service role (edge functions) to insert
CREATE POLICY "Allow service role to insert chat analytics"
  ON public.chat_analytics
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy to allow service role to select (for analytics dashboard)
CREATE POLICY "Allow service role to read chat analytics"
  ON public.chat_analytics
  FOR SELECT
  TO service_role
  USING (true);

-- Create a view for common analytics queries
CREATE OR REPLACE VIEW public.chat_analytics_summary AS
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