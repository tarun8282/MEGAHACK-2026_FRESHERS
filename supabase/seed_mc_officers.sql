-- ============================================================
-- SEED: Municipal Corporation Admin Officers
-- Run AFTER seed.sql (states & cities must exist first)
-- ============================================================
-- This inserts mc_admin entries into the officers table.
-- These are the accounts used to LOGIN to the MC Dashboard.
-- Default password: Admin@1234
-- ============================================================

INSERT INTO public.officers (id, full_name, username, password, phone, role, state_id, city_id, department_id) VALUES

  -- ── Maharashtra ──────────────────────────────────────────
  (gen_random_uuid(), 'Mumbai MC Admin',       'mc_mumbai',       'Admin@1234', '9800000001', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'MH'),
   (SELECT id FROM public.cities WHERE username = 'mc_mumbai'), NULL),

  (gen_random_uuid(), 'Pune MC Admin',         'mc_pune',         'Admin@1234', '9800000002', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'MH'),
   (SELECT id FROM public.cities WHERE username = 'mc_pune'), NULL),

  (gen_random_uuid(), 'Nagpur MC Admin',       'mc_nagpur',       'Admin@1234', '9800000003', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'MH'),
   (SELECT id FROM public.cities WHERE username = 'mc_nagpur'), NULL),

  (gen_random_uuid(), 'Nashik MC Admin',       'mc_nashik',       'Admin@1234', '9800000004', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'MH'),
   (SELECT id FROM public.cities WHERE username = 'mc_nashik'), NULL),

  (gen_random_uuid(), 'Aurangabad MC Admin',   'mc_aurangabad',   'Admin@1234', '9800000005', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'MH'),
   (SELECT id FROM public.cities WHERE username = 'mc_aurangabad'), NULL),

  -- ── Gujarat ──────────────────────────────────────────────
  (gen_random_uuid(), 'Ahmedabad MC Admin',    'mc_ahmedabad',    'Admin@1234', '9800000006', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'GJ'),
   (SELECT id FROM public.cities WHERE username = 'mc_ahmedabad'), NULL),

  (gen_random_uuid(), 'Surat MC Admin',        'mc_surat',        'Admin@1234', '9800000007', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'GJ'),
   (SELECT id FROM public.cities WHERE username = 'mc_surat'), NULL),

  (gen_random_uuid(), 'Vadodara MC Admin',     'mc_vadodara',     'Admin@1234', '9800000008', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'GJ'),
   (SELECT id FROM public.cities WHERE username = 'mc_vadodara'), NULL),

  (gen_random_uuid(), 'Rajkot MC Admin',       'mc_rajkot',       'Admin@1234', '9800000009', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'GJ'),
   (SELECT id FROM public.cities WHERE username = 'mc_rajkot'), NULL),

  -- ── Karnataka ────────────────────────────────────────────
  (gen_random_uuid(), 'Bengaluru MC Admin',    'mc_bengaluru',    'Admin@1234', '9800000010', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'KA'),
   (SELECT id FROM public.cities WHERE username = 'mc_bengaluru'), NULL),

  (gen_random_uuid(), 'Mysuru MC Admin',       'mc_mysuru',       'Admin@1234', '9800000011', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'KA'),
   (SELECT id FROM public.cities WHERE username = 'mc_mysuru'), NULL),

  (gen_random_uuid(), 'Hubballi MC Admin',     'mc_hubballi',     'Admin@1234', '9800000012', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'KA'),
   (SELECT id FROM public.cities WHERE username = 'mc_hubballi'), NULL),

  -- ── Tamil Nadu ───────────────────────────────────────────
  (gen_random_uuid(), 'Chennai MC Admin',      'mc_chennai',      'Admin@1234', '9800000013', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'TN'),
   (SELECT id FROM public.cities WHERE username = 'mc_chennai'), NULL),

  (gen_random_uuid(), 'Coimbatore MC Admin',   'mc_coimbatore',   'Admin@1234', '9800000014', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'TN'),
   (SELECT id FROM public.cities WHERE username = 'mc_coimbatore'), NULL),

  (gen_random_uuid(), 'Madurai MC Admin',      'mc_madurai',      'Admin@1234', '9800000015', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'TN'),
   (SELECT id FROM public.cities WHERE username = 'mc_madurai'), NULL),

  -- ── Delhi ────────────────────────────────────────────────
  (gen_random_uuid(), 'Delhi MC Admin',        'mc_delhi',        'Admin@1234', '9800000016', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'DL'),
   (SELECT id FROM public.cities WHERE username = 'mc_delhi'), NULL),

  -- ── Rajasthan ────────────────────────────────────────────
  (gen_random_uuid(), 'Jaipur MC Admin',       'mc_jaipur',       'Admin@1234', '9800000017', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'RJ'),
   (SELECT id FROM public.cities WHERE username = 'mc_jaipur'), NULL),

  (gen_random_uuid(), 'Jodhpur MC Admin',      'mc_jodhpur',      'Admin@1234', '9800000018', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'RJ'),
   (SELECT id FROM public.cities WHERE username = 'mc_jodhpur'), NULL),

  (gen_random_uuid(), 'Udaipur MC Admin',      'mc_udaipur',      'Admin@1234', '9800000019', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'RJ'),
   (SELECT id FROM public.cities WHERE username = 'mc_udaipur'), NULL),

  -- ── Uttar Pradesh ────────────────────────────────────────
  (gen_random_uuid(), 'Lucknow MC Admin',      'mc_lucknow',      'Admin@1234', '9800000020', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'UP'),
   (SELECT id FROM public.cities WHERE username = 'mc_lucknow'), NULL),

  (gen_random_uuid(), 'Kanpur MC Admin',       'mc_kanpur',       'Admin@1234', '9800000021', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'UP'),
   (SELECT id FROM public.cities WHERE username = 'mc_kanpur'), NULL),

  (gen_random_uuid(), 'Agra MC Admin',         'mc_agra',         'Admin@1234', '9800000022', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'UP'),
   (SELECT id FROM public.cities WHERE username = 'mc_agra'), NULL),

  (gen_random_uuid(), 'Varanasi MC Admin',     'mc_varanasi',     'Admin@1234', '9800000023', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'UP'),
   (SELECT id FROM public.cities WHERE username = 'mc_varanasi'), NULL),

  -- ── West Bengal ──────────────────────────────────────────
  (gen_random_uuid(), 'Kolkata MC Admin',      'mc_kolkata',      'Admin@1234', '9800000024', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'WB'),
   (SELECT id FROM public.cities WHERE username = 'mc_kolkata'), NULL),

  (gen_random_uuid(), 'Howrah MC Admin',       'mc_howrah',       'Admin@1234', '9800000025', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'WB'),
   (SELECT id FROM public.cities WHERE username = 'mc_howrah'), NULL),

  -- ── Telangana ────────────────────────────────────────────
  (gen_random_uuid(), 'Hyderabad MC Admin',    'mc_hyderabad',    'Admin@1234', '9800000026', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'TG'),
   (SELECT id FROM public.cities WHERE username = 'mc_hyderabad'), NULL),

  (gen_random_uuid(), 'Warangal MC Admin',     'mc_warangal',     'Admin@1234', '9800000027', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'TG'),
   (SELECT id FROM public.cities WHERE username = 'mc_warangal'), NULL),

  -- ── Kerala ───────────────────────────────────────────────
  (gen_random_uuid(), 'Thiruvananthapuram MC', 'mc_thiruvananthapuram', 'Admin@1234', '9800000028', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'KL'),
   (SELECT id FROM public.cities WHERE username = 'mc_thiruvananthapuram'), NULL),

  (gen_random_uuid(), 'Kochi MC Admin',        'mc_kochi',        'Admin@1234', '9800000029', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'KL'),
   (SELECT id FROM public.cities WHERE username = 'mc_kochi'), NULL),

  (gen_random_uuid(), 'Kozhikode MC Admin',    'mc_kozhikode',    'Admin@1234', '9800000030', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'KL'),
   (SELECT id FROM public.cities WHERE username = 'mc_kozhikode'), NULL),

  -- ── Punjab ───────────────────────────────────────────────
  (gen_random_uuid(), 'Ludhiana MC Admin',     'mc_ludhiana',     'Admin@1234', '9800000031', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'PB'),
   (SELECT id FROM public.cities WHERE username = 'mc_ludhiana'), NULL),

  (gen_random_uuid(), 'Amritsar MC Admin',     'mc_amritsar',     'Admin@1234', '9800000032', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'PB'),
   (SELECT id FROM public.cities WHERE username = 'mc_amritsar'), NULL),

  -- ── Madhya Pradesh ───────────────────────────────────────
  (gen_random_uuid(), 'Bhopal MC Admin',       'mc_bhopal',       'Admin@1234', '9800000033', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'MP'),
   (SELECT id FROM public.cities WHERE username = 'mc_bhopal'), NULL),

  (gen_random_uuid(), 'Indore MC Admin',       'mc_indore',       'Admin@1234', '9800000034', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'MP'),
   (SELECT id FROM public.cities WHERE username = 'mc_indore'), NULL),

  (gen_random_uuid(), 'Jabalpur MC Admin',     'mc_jabalpur',     'Admin@1234', '9800000035', 'mc_admin',
   (SELECT id FROM public.states WHERE code = 'MP'),
   (SELECT id FROM public.cities WHERE username = 'mc_jabalpur'), NULL)

ON CONFLICT (username) DO NOTHING;

-- ============================================================
-- Verify: list all mc_admin officers with their city & state
-- ============================================================
SELECT
  o.username,
  o.full_name,
  o.role,
  c.name  AS city,
  s.name  AS state
FROM public.officers o
JOIN public.cities  c ON c.id = o.city_id
JOIN public.states  s ON s.id = o.state_id
WHERE o.role = 'mc_admin'
ORDER BY s.name, c.name;
