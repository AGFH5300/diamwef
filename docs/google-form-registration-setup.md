# Google Form Registration Setup

## Required environment variables

### Frontend (`.env`)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Supabase Edge Function secrets
- `GOOGLE_FORM_WEBHOOK_SECRET`: shared secret sent as `x-webhook-secret` header.
- `SUPABASE_SERVICE_ROLE_KEY`: required for upsert + auth invite.
- `SUPABASE_URL`: Supabase project URL.
- `APP_BASE_URL`: public site URL used for invite/password setup redirect.

## Webhook route
- Supabase function name: `google-form-registration-webhook`
- Public endpoint format:
  - `https://<project-ref>.supabase.co/functions/v1/google-form-registration-webhook`

## Expected payload shape

```json
{
  "fullName": "Student Name",
  "email": "student@example.com",
  "school": "School Name",
  "grade": "Year 10",
  "stakeholder": "IMF"
}
```

Accepted aliases: `name`, `schoolName`, `year`, `preferredInstitution`, `preferredCountry`.

## Google Forms / Apps Script connection
1. Add an Apps Script attached to your response spreadsheet.
2. Trigger on new form submission.
3. POST normalized fields to the webhook URL above.
4. Include header: `x-webhook-secret: <GOOGLE_FORM_WEBHOOK_SECRET>`.

## Password/setup emails
- The webhook calls `supabase.auth.admin.inviteUserByEmail(email)`.
- Supabase sends an invite/setup email automatically.
- For repeat submissions, registration upserts by email; invite errors for existing users are ignored safely.

## Manual checks
- Confirm `participant_registrations` has a unique email constraint.
- Confirm announcements migration is applied.
- Replace `conferenceConfig.registration.googleFormEmbedUrl` with the live form embed URL.
