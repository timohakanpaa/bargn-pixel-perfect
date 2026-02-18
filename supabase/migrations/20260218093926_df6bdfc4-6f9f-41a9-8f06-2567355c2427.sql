
-- Create social_accounts table for storing Instagram credentials
CREATE TABLE public.social_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  account_id text NOT NULL,
  account_name text,
  access_token text NOT NULL,
  expires_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_accounts FORCE ROW LEVEL SECURITY;

-- Only admins can do anything with social_accounts
CREATE POLICY "Admins can manage social accounts"
  ON public.social_accounts
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Block anon access
CREATE POLICY "Block anon access to social_accounts"
  ON public.social_accounts
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- Auto-update updated_at
CREATE TRIGGER update_social_accounts_updated_at
  BEFORE UPDATE ON public.social_accounts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add Instagram columns to content_materials
ALTER TABLE public.content_materials
  ADD COLUMN IF NOT EXISTS instagram_post_id text,
  ADD COLUMN IF NOT EXISTS published_to_instagram_at timestamptz;
