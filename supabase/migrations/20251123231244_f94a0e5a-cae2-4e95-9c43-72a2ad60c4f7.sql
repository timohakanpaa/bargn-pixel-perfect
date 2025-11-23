-- Ensure RLS is enabled on chat_analytics
ALTER TABLE public.chat_analytics ENABLE ROW LEVEL SECURITY;

-- Drop any existing public read policies (in case they still exist)
DROP POLICY IF EXISTS "Service role can read chat analytics" ON public.chat_analytics;
DROP POLICY IF EXISTS "Public can read chat analytics" ON public.chat_analytics;

-- Ensure admin-only SELECT policy exists
DROP POLICY IF EXISTS "Admins can view chat analytics" ON public.chat_analytics;
CREATE POLICY "Admins can view chat analytics"
  ON public.chat_analytics
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Keep the INSERT policy for the chat edge function
-- (already exists from previous migrations)