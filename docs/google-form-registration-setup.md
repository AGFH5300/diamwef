# Google Form Registration Setup

## Required environment variables

### Frontend (`.env`)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_INSTAGRAM_INTEGRATION_MODE` (`curated` or `official_api`; defaults to `curated`)

### Supabase Edge Function secrets
- `GOOGLE_FORM_WEBHOOK_SECRET`: shared secret sent as `x-webhook-secret` header.
- `SUPABASE_SERVICE_ROLE_KEY`: required for registration upsert + auth admin calls.
- `SUPABASE_URL`: Supabase project URL.
- `APP_BASE_URL`: public site URL used for password setup redirect.
- `RESEND_API_KEY`: API key for sending participant emails.
- `RESEND_FROM_EMAIL`: verified Resend sender email.
- `RESEND_FROM_NAME`: sender display name (example: `MWEF Team`).
- `RESEND_REPLY_TO` (optional): reply-to address.

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

Accepted aliases: `name`, `schoolName`, `year`, `stakeholder`.

## End-to-end flow (Google Form -> Supabase -> Resend)
1. Google Form submission triggers Apps Script.
2. Apps Script sends payload to `google-form-registration-webhook` with `x-webhook-secret`.
3. Function upserts into `participant_registrations` with `onConflict: email` (idempotent by email).
4. Function checks auth users, creates missing users, and generates a setup/recovery link.
5. Function sends branded participant email via Resend with account setup link.
6. If Resend fails, the function returns an explicit error and logs details.

## Google Forms / Apps Script connection
1. Add an Apps Script attached to your response spreadsheet.
2. Trigger on new form submission.
3. POST normalized fields to the webhook URL above.
4. Include header: `x-webhook-secret: <GOOGLE_FORM_WEBHOOK_SECRET>`.

## Manual checks
- Confirm `participant_registrations` has a unique email constraint.
- Confirm announcements migration is applied.
- Confirm Resend sender domain/email is verified before production go-live.
- Confirm `conferenceConfig.registration.googleFormEmbedUrl` points to the live Google Form.
