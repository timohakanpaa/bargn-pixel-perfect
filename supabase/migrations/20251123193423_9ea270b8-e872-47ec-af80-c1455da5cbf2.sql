-- Enable realtime for funnel_progress table
ALTER TABLE public.funnel_progress REPLICA IDENTITY FULL;

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.funnel_progress;