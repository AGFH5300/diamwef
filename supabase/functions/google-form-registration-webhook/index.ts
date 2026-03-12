import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-secret' };

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  const expectedSecret = Deno.env.get('GOOGLE_FORM_WEBHOOK_SECRET');
  const providedSecret = req.headers.get('x-webhook-secret');
  if (!expectedSecret || providedSecret !== expectedSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

  try {
    const body = await req.json();
    const fullName = String(body.fullName || body.name || '').trim();
    const [firstName, ...rest] = fullName.split(/\s+/);
    const lastName = rest.join(' ') || '-';
    const email = String(body.email || '').toLowerCase();
    const school = String(body.school || body.schoolName || '');
    const grade = String(body.grade || body.year || '');
    const stakeholder = String(body.stakeholder || body.preferredInstitution || body.preferredCountry || '');

    if (!email || !firstName) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const notes = [`School: ${school}`, `Grade: ${grade}`, `Source: Google Form`].join('\n');

    const { error: upsertError } = await supabase.from('participant_registrations').upsert(
      {
        email,
        first_name: firstName,
        last_name: lastName,
        delegation_type: 'stakeholder',
        preferred_country: null,
        preferred_institution: stakeholder || null,
        committee_preference: null,
        notes,
        status: 'pending',
      },
      { onConflict: 'email' },
    );

    if (upsertError) throw upsertError;

    const { error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: { first_name: firstName, last_name: lastName },
      redirectTo: `${Deno.env.get('APP_BASE_URL') || ''}/reset-password`,
    });

    if (inviteError && !inviteError.message.includes('already')) {
      throw inviteError;
    }

    return new Response(JSON.stringify({ success: true, email }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('google-form-registration-webhook error', error);
    return new Response(JSON.stringify({ error: 'Failed to process submission' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
