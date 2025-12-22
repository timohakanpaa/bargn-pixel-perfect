-- Add created_by column to track ownership of alert configurations
ALTER TABLE public.alert_configurations 
ADD COLUMN created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update existing rows to have a placeholder (will be null for existing configs)
-- In production, you may want to assign these to a specific admin user

-- Drop existing restrictive RLS policies
DROP POLICY IF EXISTS "Admins can view alert configurations" ON public.alert_configurations;
DROP POLICY IF EXISTS "Admins can insert alert configurations" ON public.alert_configurations;
DROP POLICY IF EXISTS "Admins can update alert configurations" ON public.alert_configurations;
DROP POLICY IF EXISTS "Admins can delete alert configurations" ON public.alert_configurations;

-- Create new ownership-based RLS policies
-- Users can only view their own alert configurations
CREATE POLICY "Users can view own alert configurations"
ON public.alert_configurations
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND (
    created_by = auth.uid() 
    OR created_by IS NULL -- Allow access to legacy configs without owner
  )
);

-- Users can only insert alert configurations for themselves
CREATE POLICY "Users can insert own alert configurations"
ON public.alert_configurations
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND created_by = auth.uid()
);

-- Users can only update their own alert configurations
CREATE POLICY "Users can update own alert configurations"
ON public.alert_configurations
FOR UPDATE
USING (
  auth.uid() IS NOT NULL 
  AND (created_by = auth.uid() OR created_by IS NULL)
)
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND (created_by = auth.uid() OR created_by IS NULL)
);

-- Users can only delete their own alert configurations
CREATE POLICY "Users can delete own alert configurations"
ON public.alert_configurations
FOR DELETE
USING (
  auth.uid() IS NOT NULL 
  AND (created_by = auth.uid() OR created_by IS NULL)
);

-- Update the can_access_alert_config function to use ownership check
CREATE OR REPLACE FUNCTION public.can_access_alert_config(config_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.alert_configurations
    WHERE id = config_id
    AND (created_by = auth.uid() OR created_by IS NULL)
  )
$$;