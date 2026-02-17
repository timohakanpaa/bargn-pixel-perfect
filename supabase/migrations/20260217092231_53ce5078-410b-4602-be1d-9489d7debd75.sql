
-- Create update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Blog articles table
CREATE TABLE public.blog_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  title_fi TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  content_fi TEXT NOT NULL DEFAULT '',
  content_en TEXT NOT NULL DEFAULT '',
  excerpt_fi TEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  keywords TEXT[] DEFAULT '{}',
  category TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  author TEXT DEFAULT 'Bargn',
  created_by UUID,
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage articles" ON public.blog_articles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Published articles are public" ON public.blog_articles
  FOR SELECT USING (status = 'published');

-- AI prompt templates
CREATE TABLE public.blog_prompt_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  prompt_template TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_prompt_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage prompts" ON public.blog_prompt_templates
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

INSERT INTO public.blog_prompt_templates (name, prompt_template, is_default) VALUES (
  'Default Blog Post',
  'Write a professional blog article about {{keywords}}. The article should be informative, engaging, and SEO-optimized. Include an introduction, 3-4 main sections with headers, and a conclusion. The topic is related to savings, deals, and smart shopping.',
  true
);

-- Scheduled generation jobs
CREATE TABLE public.blog_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keywords TEXT[] NOT NULL,
  prompt_template_id UUID REFERENCES public.blog_prompt_templates(id),
  cron_expression TEXT DEFAULT '0 9 * * 1',
  language TEXT NOT NULL DEFAULT 'both' CHECK (language IN ('fi', 'en', 'both')),
  is_active BOOLEAN DEFAULT true,
  last_run_at TIMESTAMPTZ,
  next_run_at TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage schedules" ON public.blog_schedules
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Triggers
CREATE TRIGGER update_blog_articles_updated_at
  BEFORE UPDATE ON public.blog_articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_prompts_updated_at
  BEFORE UPDATE ON public.blog_prompt_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
