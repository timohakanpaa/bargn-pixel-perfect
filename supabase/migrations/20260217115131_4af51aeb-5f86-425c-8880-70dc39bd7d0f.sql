
-- Table for storing checkout leads (email before Stripe redirect)
CREATE TABLE public.checkout_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.checkout_leads ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public checkout page, no auth required)
CREATE POLICY "Anyone can submit checkout lead"
  ON public.checkout_leads
  FOR INSERT
  WITH CHECK (true);

-- Only admins can view leads
CREATE POLICY "Admins can view checkout leads"
  ON public.checkout_leads
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );
