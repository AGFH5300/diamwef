-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Anyone can submit partnership application" ON public.partnership_applications;
DROP POLICY IF EXISTS "Anyone can submit volunteer signup" ON public.volunteer_signups;

-- Create more specific public insert policies with basic field validation
CREATE POLICY "Public can submit partnership application"
  ON public.partnership_applications FOR INSERT
  WITH CHECK (
    organization_name IS NOT NULL 
    AND contact_person IS NOT NULL 
    AND email IS NOT NULL 
    AND partnership_type IS NOT NULL
  );

CREATE POLICY "Public can submit volunteer signup"
  ON public.volunteer_signups FOR INSERT
  WITH CHECK (
    full_name IS NOT NULL 
    AND school IS NOT NULL 
    AND email IS NOT NULL 
    AND preferred_role IS NOT NULL
  );