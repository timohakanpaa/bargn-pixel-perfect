-- Drop restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Published articles are public" ON public.blog_articles;

CREATE POLICY "Published articles are public"
ON public.blog_articles
AS PERMISSIVE
FOR SELECT
TO anon, authenticated
USING (status = 'published');

-- Keep admin policy but make it permissive too
DROP POLICY IF EXISTS "Admins can manage articles" ON public.blog_articles;

CREATE POLICY "Admins can manage articles"
ON public.blog_articles
AS PERMISSIVE
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));