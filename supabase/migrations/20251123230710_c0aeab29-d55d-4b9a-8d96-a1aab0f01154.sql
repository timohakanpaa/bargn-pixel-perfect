-- Remove public read access from chat_analytics
DROP POLICY IF EXISTS "Service role can read chat analytics" ON public.chat_analytics;

-- Remove public read access from alert_configurations
DROP POLICY IF EXISTS "Service role can read alert configurations" ON public.alert_configurations;

-- Remove overly permissive policy from funnel_progress
DROP POLICY IF EXISTS "Allow service role full access to funnel progress" ON public.funnel_progress;

-- Add INSERT-only policy for funnel_progress (for track-analytics edge function)
CREATE POLICY "Service role can insert funnel progress"
  ON public.funnel_progress
  FOR INSERT
  WITH CHECK (true);