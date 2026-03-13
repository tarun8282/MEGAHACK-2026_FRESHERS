-- 00-initial-schema.sql

-- Enable PostGIS for location data
create extension if not exists postgis;

-- 1. Profiles Table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  role text check (role in ('citizen', 'department_admin', 'super_admin')) default 'citizen',
  jurisdiction_id uuid,
  state_id uuid,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. States Table
create table public.states (
  id uuid default gen_random_uuid() primary key,
  name text not null unique
);

-- 3. Jurisdictions Table
create table public.jurisdictions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  state_id uuid references public.states(id),
  level text check (level in ('City', 'District', 'State'))
);

-- 4. Departments Table
create table public.departments (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  state_id uuid references public.states(id),
  contact_details jsonb
);

-- 5. Complaints Table
create table public.complaints (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  title text not null,
  description text,
  location_lat double precision,
  location_lng double precision,
  proof_url text,
  status text check (status in ('Submitted', 'In Progress', 'Resolved', 'Rejected')) default 'Submitted',
  department_id uuid references public.departments(id),
  jurisdiction_id uuid references public.jurisdictions(id),
  ai_classification_raw jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.complaints enable row level security;
alter table public.departments enable row level security;
alter table public.states enable row level security;
alter table public.jurisdictions enable row level security;

-- Policies
-- Citizens
create policy "Citizens can view own complaints" on complaints for select using (auth.uid() = user_id);
create policy "Citizens can report complaints" on complaints for insert with check (auth.uid() = user_id);

-- Admins (Simplified for skeleton)
create policy "Admins can view complaints in jurisdiction" on complaints
  for select using (
    exists (
      select 1 from profiles 
      where profiles.id = auth.uid() 
      and (profiles.role = 'super_admin' or profiles.jurisdiction_id = complaints.jurisdiction_id)
    )
  );

-- Storage bucket for proofs
-- (Usually managed via Supabase UI or API, but defining intention here)
-- Bucket: 'complaint-proofs'
