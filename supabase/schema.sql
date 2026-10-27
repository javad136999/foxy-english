-- اجرا در Supabase > SQL Editor
create table if not exists public.progress (
  device_id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);
alter table public.progress enable row level security;
-- نسخه آزمایشی: هر دستگاه با device_id خودش می‌نویسد. قبل از انتشار جدی به Supabase Auth ناشناس (anonymous) ارتقا دهید.
create policy "anon upsert" on public.progress for insert to anon with check (true);
create policy "anon update" on public.progress for update to anon using (true) with check (true);
