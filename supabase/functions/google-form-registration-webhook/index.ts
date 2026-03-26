import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-secret',
};

interface RegistrationPayload {
  fullName?: string;
  name?: string;
  email?: string;
  school?: string;
  schoolName?: string;
  grade?: string;
  year?: string;
  stakeholder?: string;
}

const sendResendEmail = async ({
  apiKey,
  fromEmail,
  fromName,
  replyTo,
  toEmail,
  subject,
  html,
}: {
  apiKey: string;
  fromEmail: string;
  fromName: string;
  replyTo?: string;
  toEmail: string;
  subject: string;
  html: string;
}) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to: [toEmail],
      subject,
      html,
      reply_to: replyTo,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(`Resend error (${response.status}): ${JSON.stringify(data)}`);
  }

  return data;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const expectedSecret = Deno.env.get('GOOGLE_FORM_WEBHOOK_SECRET');
  const providedSecret = req.headers.get('x-webhook-secret');
  if (!expectedSecret || providedSecret !== expectedSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const appBaseUrl = Deno.env.get('APP_BASE_URL') || '';
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  const resendFromEmail = Deno.env.get('RESEND_FROM_EMAIL');
  const resendFromName = Deno.env.get('RESEND_FROM_NAME') || 'MWEF Team';
  const resendReplyTo = Deno.env.get('RESEND_REPLY_TO') || undefined;

  try {
    const body = (await req.json()) as RegistrationPayload;
    const fullName = String(body.fullName || body.name || '').trim();
    const [firstName, ...rest] = fullName.split(/\s+/);
    const lastName = rest.join(' ') || '-';
    const email = String(body.email || '').toLowerCase().trim();
    const school = String(body.school || body.schoolName || '').trim();
    const grade = String(body.grade || body.year || '').trim();
    const stakeholder = String(body.stakeholder || '').trim();

    if (!email || !firstName) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const notes = [`School: ${school}`, `Grade: ${grade}`, 'Source: Google Form'].join('\n');

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

    const { data: userLookup, error: userLookupError } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });
    if (userLookupError) throw userLookupError;

    const existingUser = userLookup.users.find((user) => user.email?.toLowerCase() === email);

    let setupLink = `${appBaseUrl}/login`;
    let accountState: 'new_user' | 'existing_user' = existingUser ? 'existing_user' : 'new_user';

    if (!existingUser) {
      const { error: createUserError } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { first_name: firstName, last_name: lastName },
      });

      if (createUserError && !createUserError.message.toLowerCase().includes('already')) {
        throw createUserError;
      }

      if (createUserError && createUserError.message.toLowerCase().includes('already')) {
        accountState = 'existing_user';
      }
    }

    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: {
        redirectTo: `${appBaseUrl}/reset-password`,
      },
    });

    if (linkError) {
      console.error('Failed to generate setup link', { email, error: linkError.message });
    } else if (linkData.properties?.action_link) {
      setupLink = linkData.properties.action_link;
    }

    if (!resendApiKey || !resendFromEmail) {
      throw new Error('Missing Resend configuration (RESEND_API_KEY and/or RESEND_FROM_EMAIL).');
    }

    const subject = accountState === 'new_user'
      ? 'Welcome to MWEF — set up your account'
      : 'MWEF registration received — access your dashboard';

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#111;max-width:640px;margin:0 auto;">
        <h2 style="margin-bottom:8px;">Model World Economic Forum (MWEF)</h2>
        <p>Hi ${firstName},</p>
        <p>We received your MWEF registration form and synced your submission to the participant system.</p>
        <p>
          <strong>School:</strong> ${school || 'Not provided'}<br />
          <strong>Grade:</strong> ${grade || 'Not provided'}<br />
          <strong>Stakeholder:</strong> ${stakeholder || 'Not provided'}
        </p>
        <p>
          Please use the link below to ${accountState === 'new_user' ? 'set up your account and choose a password' : 'access or reset your account password'}:
        </p>
        <p>
          <a href="${setupLink}" style="display:inline-block;background:#7a201f;color:#fff;text-decoration:none;padding:10px 16px;border-radius:6px;">Open MWEF Account Setup</a>
        </p>
        <p>If the button does not work, copy and paste this link into your browser:</p>
        <p><a href="${setupLink}">${setupLink}</a></p>
        <p>See you on April 11, 2026 at DIAEH.</p>
        <p>— MWEF Team</p>
      </div>
    `;

    const resendData = await sendResendEmail({
      apiKey: resendApiKey,
      fromEmail: resendFromEmail,
      fromName: resendFromName,
      replyTo: resendReplyTo,
      toEmail: email,
      subject,
      html,
    });

    return new Response(JSON.stringify({ success: true, email, accountState, resendId: resendData.id ?? null }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('google-form-registration-webhook error', error);
    return new Response(JSON.stringify({ error: 'Failed to process submission', details: error instanceof Error ? error.message : String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
