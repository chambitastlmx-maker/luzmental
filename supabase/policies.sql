-- Enable RLS
alter table if exists questionnaires enable row level security;
alter table if exists questions enable row level security;
alter table if exists options enable row level security;
alter table if exists responses enable row level security;
alter table if exists response_items enable row level security;

-- Structure readable by anon (for rendering quiz)
drop policy if exists anon_read_structure on questionnaires;
create policy anon_read_structure on questionnaires
  for select using (true);

drop policy if exists anon_read_questions on questions;
create policy anon_read_questions on questions
  for select using (true);

drop policy if exists anon_read_options on options;
create policy anon_read_options on options
  for select using (true);

-- Prevent anon from reading raw responses
drop policy if exists deny_select_responses on responses;
create policy deny_select_responses on responses
  for select using (false);

drop policy if exists deny_select_response_items on response_items;
create policy deny_select_response_items on response_items
  for select using (false);

-- Allow inserts from anon into responses/response_items
drop policy if exists anon_insert_responses on responses;
create policy anon_insert_responses on responses
  for insert with check (true);

drop policy if exists anon_insert_response_items on response_items;
create policy anon_insert_response_items on response_items
  for insert with check (true);
