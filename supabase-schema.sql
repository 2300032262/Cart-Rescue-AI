create table if not exists public.orders (
  id text primary key,
  email text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled')),
  total_inr integer not null check (total_inr >= 0),
  items jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create index if not exists orders_created_at_idx on public.orders (created_at desc);
