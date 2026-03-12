create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  cta_link text,
  pinned boolean not null default false,
  is_active boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.announcements enable row level security;

create policy if not exists "announcements are readable to authenticated users"
  on public.announcements
  for select
  to authenticated
  using (is_active = true);

create unique index if not exists participant_registrations_email_key on public.participant_registrations (email);
