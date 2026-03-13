-- seed.sql

insert into public.states (name) values 
('Maharashtra'),
('Karnataka'),
('Delhi');

-- Example Jurisdictions
insert into public.jurisdictions (name, state_id, level) 
select 'BMC (Brihanmumbai Municipal Corporation)', id, 'City' from public.states where name = 'Maharashtra';

insert into public.jurisdictions (name, state_id, level) 
select 'Pune Municipal Corporation', id, 'City' from public.states where name = 'Maharashtra';

-- Example Departments
insert into public.departments (name, state_id, contact_details)
select 'Road Maintenance', id, '{"email": "roads@bmc.gov.in", "phone": "1916"}' from public.states where name = 'Maharashtra';

insert into public.departments (name, state_id, contact_details)
select 'Waste Management', id, '{"email": "waste@bmc.gov.in", "phone": "1916"}' from public.states where name = 'Maharashtra';
