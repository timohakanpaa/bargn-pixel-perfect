-- Create conversion funnels table
CREATE TABLE IF NOT EXISTS public.conversion_funnels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  steps JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true
);

-- Create funnel progress tracking table
CREATE TABLE IF NOT EXISTS public.funnel_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id UUID NOT NULL,
  funnel_id UUID REFERENCES public.conversion_funnels(id) ON DELETE CASCADE,
  current_step INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_funnel_progress_session_id ON public.funnel_progress(session_id);
CREATE INDEX IF NOT EXISTS idx_funnel_progress_funnel_id ON public.funnel_progress(funnel_id);
CREATE INDEX IF NOT EXISTS idx_funnel_progress_created_at ON public.funnel_progress(created_at DESC);

-- Enable RLS
ALTER TABLE public.conversion_funnels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_progress ENABLE ROW LEVEL SECURITY;

-- Policies for conversion_funnels
CREATE POLICY "Allow service role full access to funnels"
  ON public.conversion_funnels
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to active funnels"
  ON public.conversion_funnels
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Policies for funnel_progress
CREATE POLICY "Allow public to insert funnel progress"
  ON public.funnel_progress
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow service role full access to funnel progress"
  ON public.funnel_progress
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);