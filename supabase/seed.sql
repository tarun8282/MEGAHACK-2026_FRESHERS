-- NagarSetu Seed Data

-- 1. States
INSERT INTO public.states (name, code) VALUES
('Maharashtra', 'MH'),
('Delhi', 'DL'),
('Karnataka', 'KA'),
('Tamil Nadu', 'TN'),
('Gujarat', 'GJ'),
('West Bengal', 'WB');

-- 2. Cities
INSERT INTO public.cities (state_id, name, official_name)
SELECT id, 'Mumbai', 'Brihanmumbai Municipal Corporation' FROM public.states WHERE code = 'MH';

INSERT INTO public.cities (state_id, name, official_name)
SELECT id, 'Pune', 'Pune Municipal Corporation' FROM public.states WHERE code = 'MH';

INSERT INTO public.cities (state_id, name, official_name)
SELECT id, 'New Delhi', 'Municipal Corporation of Delhi' FROM public.states WHERE code = 'DL';

INSERT INTO public.cities (state_id, name, official_name)
SELECT id, 'Bengaluru', 'Bruhat Bengaluru Mahanagara Palike' FROM public.states WHERE code = 'KA';

-- 3. Departments
-- Mumbai (BMC)
INSERT INTO public.departments (city_id, name, category_slug, helpline, email, sla_hours)
SELECT id, 'BMC Roads Department', 'roads', '1916', 'roads@bmc.gov.in', 48 FROM public.cities WHERE name = 'Mumbai';

INSERT INTO public.departments (city_id, name, category_slug, helpline, email, sla_hours)
SELECT id, 'BMC Water Supply', 'water', '1916', 'water@bmc.gov.in', 24 FROM public.cities WHERE name = 'Mumbai';

INSERT INTO public.departments (city_id, name, category_slug, helpline, email, sla_hours)
SELECT id, 'BMC Solid Waste Management', 'garbage', '1916', 'swm@bmc.gov.in', 12 FROM public.cities WHERE name = 'Mumbai';

INSERT INTO public.departments (city_id, name, category_slug, helpline, email, sla_hours)
SELECT id, 'BMC Electricity & Streetlights', 'electricity', '1916', 'electricity@bmc.gov.in', 6 FROM public.cities WHERE name = 'Mumbai';

-- Pune (PMC)
INSERT INTO public.departments (city_id, name, category_slug, helpline, email, sla_hours)
SELECT id, 'PMC Road Maintenance', 'roads', '1800 103 0222', 'roads@punecorp.in', 48 FROM public.cities WHERE name = 'Pune';

INSERT INTO public.departments (city_id, name, category_slug, helpline, email, sla_hours)
SELECT id, 'PMC Water Department', 'water', '1800 103 0222', 'water@punecorp.in', 24 FROM public.cities WHERE name = 'Pune';
