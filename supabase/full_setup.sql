-- ==========================================================
-- THE BAKER'S EDIT - COMPLETE SETUP SCRIPT (SCHEMA + SEED)
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/belcabxawoxaufkypvhb/sql/new
-- ==========================================================

-- ==========================================================
-- PART 1: EXTENSIONS & SCHEMA
-- ==========================================================

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 1. LOCATIONS TABLE
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  zone TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Mumbai',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BAKERS TABLE
CREATE TABLE IF NOT EXISTS bakers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  bio TEXT NOT NULL,
  short_description TEXT NOT NULL,
  profile_image TEXT NOT NULL,
  cover_image TEXT,
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  area TEXT NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 5.00 CHECK (rating >= 0 AND rating <= 5.00),
  review_count INT DEFAULT 0,
  specialties TEXT NOT NULL,
  specialty_tags TEXT[] DEFAULT '{}',
  price_range TEXT NOT NULL,
  price_min INT NOT NULL DEFAULT 0,
  price_max INT NOT NULL DEFAULT 10000,
  instagram TEXT NOT NULL,
  instagram_handle TEXT NOT NULL,
  website TEXT,
  phone TEXT,
  lead_time TEXT DEFAULT '24-48 hours notice',
  dietary_options TEXT[] DEFAULT '{}',
  verified BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  features JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DESSERTS TABLE
CREATE TABLE IF NOT EXISTS desserts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  baker_id UUID NOT NULL REFERENCES bakers(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  price INT NOT NULL,
  is_eggless BOOLEAN DEFAULT false,
  is_vegan BOOLEAN DEFAULT false,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  baker_id UUID NOT NULL REFERENCES bakers(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  rating NUMERIC(2, 1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  date TEXT NOT NULL,
  sentiment_score NUMERIC(3, 2) DEFAULT 0.0 CHECK (sentiment_score >= -1.0 AND sentiment_score <= 1.0),
  sentiment_label TEXT DEFAULT 'Positive' CHECK (sentiment_label IN ('Delighted', 'Positive', 'Neutral', 'Negative')),
  aspects TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BAKER APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS baker_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  instagram TEXT NOT NULL,
  location TEXT NOT NULL,
  specialty TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'approved', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_bakers_area ON bakers(area);
CREATE INDEX IF NOT EXISTS idx_bakers_location_id ON bakers(location_id);
CREATE INDEX IF NOT EXISTS idx_bakers_rating ON bakers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_bakers_price_min ON bakers(price_min);
CREATE INDEX IF NOT EXISTS idx_bakers_price_max ON bakers(price_max);
CREATE INDEX IF NOT EXISTS idx_desserts_baker_id ON desserts(baker_id);
CREATE INDEX IF NOT EXISTS idx_desserts_category_id ON desserts(category_id);
CREATE INDEX IF NOT EXISTS idx_reviews_baker_id ON reviews(baker_id);

-- Trigram search indexes
CREATE INDEX IF NOT EXISTS idx_bakers_name_trgm ON bakers USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_bakers_specialties_trgm ON bakers USING gin (specialties gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_desserts_name_trgm ON desserts USING gin (name gin_trgm_ops);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE bakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE desserts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE baker_applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running to avoid duplicate policy errors
DROP POLICY IF EXISTS "Allow public read access to locations" ON locations;
DROP POLICY IF EXISTS "Allow public read access to categories" ON categories;
DROP POLICY IF EXISTS "Allow public read access to bakers" ON bakers;
DROP POLICY IF EXISTS "Allow public read access to desserts" ON desserts;
DROP POLICY IF EXISTS "Allow public read access to reviews" ON reviews;
DROP POLICY IF EXISTS "Allow public insert to baker_applications" ON baker_applications;
DROP POLICY IF EXISTS "Allow public insert to reviews" ON reviews;

-- Create policies
CREATE POLICY "Allow public read access to locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to bakers" ON bakers FOR SELECT USING (true);
CREATE POLICY "Allow public read access to desserts" ON desserts FOR SELECT USING (true);
CREATE POLICY "Allow public read access to reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert to baker_applications" ON baker_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to reviews" ON reviews FOR INSERT WITH CHECK (rating >= 1 AND rating <= 5);

-- ==========================================================
-- PART 2: SEED DATA
-- ==========================================================

-- 1. LOCATIONS
INSERT INTO locations (id, name, zone, city) VALUES
  ('10000000-0000-0000-0000-000000000001', 'Bandra West', 'Western Suburbs', 'Mumbai'),
  ('10000000-0000-0000-0000-000000000002', 'Juhu', 'Western Suburbs', 'Mumbai'),
  ('10000000-0000-0000-0000-000000000003', 'Andheri West', 'Western Suburbs', 'Mumbai'),
  ('10000000-0000-0000-0000-000000000004', 'Powai', 'Eastern Suburbs', 'Mumbai'),
  ('10000000-0000-0000-0000-000000000005', 'Colaba', 'South Mumbai', 'Mumbai'),
  ('10000000-0000-0000-0000-000000000006', 'Lower Parel', 'South Mumbai', 'Mumbai'),
  ('10000000-0000-0000-0000-000000000007', 'Khar', 'Western Suburbs', 'Mumbai'),
  ('10000000-0000-0000-0000-000000000008', 'Dadar', 'South Mumbai', 'Mumbai')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  zone = EXCLUDED.zone,
  city = EXCLUDED.city;

-- 2. CATEGORIES
INSERT INTO categories (id, name, slug, image_url, description, display_order) VALUES
  ('20000000-0000-0000-0000-000000000001', 'Custom Cakes', 'custom-cakes', 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=900&q=80', 'Bespoke handcrafted celebration centerpieces tailored to your vision.', 1),
  ('20000000-0000-0000-0000-000000000002', 'Birthday Cakes', 'birthday-cakes', 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80', 'Joyful, whimsical, and decadent cakes made to celebrate milestones.', 2),
  ('20000000-0000-0000-0000-000000000003', 'Wedding Cakes', 'wedding-cakes', 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=900&q=80', 'Grand architectural tiers adorned with handcrafted sugar florals.', 3),
  ('20000000-0000-0000-0000-000000000004', 'Cupcakes', 'cupcakes', 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=900&q=80', 'Delicate individual sponge swirls crowned with velvety ganache.', 4),
  ('20000000-0000-0000-0000-000000000005', 'Cookies', 'cookies', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80', 'Thick-baked NYC style chunky cookies, stuffed brookies, and shortbread.', 5),
  ('20000000-0000-0000-0000-000000000006', 'Brownies', 'brownies', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80', 'Fudgy Belgian dark chocolate slabs with crinkled tops and gooey centers.', 6),
  ('20000000-0000-0000-0000-000000000007', 'Cheesecakes', 'cheesecakes', 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80', 'Silky Basque burnt cheesecakes and New York berry swirl creations.', 7),
  ('20000000-0000-0000-0000-000000000008', 'Pastries', 'pastries', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80', 'Laminated viennoiserie, French fruit tarts, and flaky mille-feuille.', 8),
  ('20000000-0000-0000-0000-000000000009', 'Dessert Boxes', 'dessert-boxes', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80', 'Luxury gifting hampers featuring curated dessert tasting assortments.', 9)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  image_url = EXCLUDED.image_url,
  description = EXCLUDED.description,
  display_order = EXCLUDED.display_order;

-- 3. BAKERS
INSERT INTO bakers (
  id, name, slug, bio, short_description, profile_image, cover_image, location_id,
  area, rating, review_count, specialties, specialty_tags, price_range, price_min, price_max,
  instagram, instagram_handle, website, phone, lead_time, dietary_options, verified, is_featured, features
) VALUES
(
  '30000000-0000-0000-0000-000000000001',
  'Aanya Kapoor',
  'aanya-kapoor',
  'Le Cordon Bleu Paris alumna crafting organic floral cakes and customized celebration centerpieces from her boutique kitchen in Bandra West.',
  'Specializing in pressed floral celebration cakes, botanical buttercream art, and signature Valrhona chocolate ganache tiers.',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
  '10000000-0000-0000-0000-000000000001',
  'Bandra West',
  4.90,
  124,
  'Celebration cakes, floral finishes, Valrhona chocolate',
  ARRAY['Custom Cakes', 'Birthday Cakes', 'Wedding Cakes', 'Floral Art'],
  '₹1,800 – ₹6,500',
  1800,
  6500,
  'https://instagram.com/aanya.bakes',
  '@aanya.bakes',
  'https://aanyabakes.com',
  '+91 98200 12345',
  '48 hours notice',
  ARRAY['Eggless available', 'Organic ingredients'],
  true,
  true,
  '{"style": "floral", "premium_tier": true}'::jsonb
),
(
  '30000000-0000-0000-0000-000000000002',
  'Rohan Mehta',
  'rohan-mehta',
  'Self-taught pastry fanatic obsessed with rich chocolate textures, chunky NYC-style cookies, and ultra-fudgy Belgian dark chocolate slabs.',
  'Gooey Belgian chocolate brownies, malted milk cookies, and artisanal midnight dessert hampers.',
  'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
  '10000000-0000-0000-0000-000000000003',
  'Andheri West',
  4.80,
  98,
  'Fudgy brownies, NYC cookies, brookie slabs',
  ARRAY['Brownies', 'Cookies', 'Dessert Boxes'],
  '₹450 – ₹2,200',
  450,
  2200,
  'https://instagram.com/rohan_bakes_mumbai',
  '@rohan_bakes_mumbai',
  NULL,
  '+91 98330 23456',
  '24 hours notice',
  ARRAY['100% Eggless available', 'Nut-free options'],
  true,
  true,
  '{"style": "chocolate", "treats": "cookies"}'::jsonb
),
(
  '30000000-0000-0000-0000-000000000003',
  'Meher D''Souza',
  'meher-dsouza',
  'Specializing in haute couture wedding cakes, botanical sugar paste sculpting, and luxurious tiered centrepieces for Mumbai''s grandest soirees.',
  'Master sugar sculptor creating dramatic multi-tiered wedding cakes, edible gold foil finishes, and bespoke luxury showstoppers.',
  'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1200&q=80',
  '10000000-0000-0000-0000-000000000002',
  'Juhu',
  5.00,
  76,
  'Wedding cakes, custom sugar work, luxury tiers',
  ARRAY['Wedding Cakes', 'Custom Cakes', 'Luxury'],
  '₹4,500 – ₹22,000',
  4500,
  22000,
  'https://instagram.com/meherdsouzacakes',
  '@meherdsouzacakes',
  'https://meherdsouza.com',
  '+91 98190 34567',
  '5 days notice for tiers',
  ARRAY['Eggless available', 'Gluten-free on request'],
  true,
  false,
  '{"tier": "ultra-luxury", "focus": "wedding"}'::jsonb
),
(
  '30000000-0000-0000-0000-000000000004',
  'Priya Nair',
  'priya-nair',
  'Bringing the velvety richness of San Sebastián to Mumbai with caramelized Basque burnt cheesecakes, seasonal tarts, and delicate pastry boxes.',
  'Creamy Basque burnt cheesecakes infused with Madagascar vanilla bean, mango compote, and French fruit tarts.',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=80',
  '10000000-0000-0000-0000-000000000004',
  'Powai',
  4.70,
  110,
  'Basque cheesecakes, fruit tarts, gifting hampers',
  ARRAY['Cheesecakes', 'Pastries', 'Dessert Boxes'],
  '₹700 – ₹3,400',
  700,
  3400,
  'https://instagram.com/priyas_patisserie',
  '@priyas_patisserie',
  NULL,
  '+91 98210 45678',
  '24 hours notice',
  ARRAY['Eggless cheesecake available', 'Gluten-free crust options'],
  true,
  false,
  '{"specialty": "basque", "origin": "european"}'::jsonb
),
(
  '30000000-0000-0000-0000-000000000005',
  'Tanvi Sheth',
  'tanvi-sheth',
  'Pioneer in modern plant-based and gourmet 100% eggless confectionery. Tanvi creates ethereal cupcakes, entremets, and customized birthday tiers without any compromise on texture.',
  'Pure eggless and vegan boutique baking: artisanal cupcakes, gourmet macarons, and allergy-friendly celebration cakes.',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=1200&q=80',
  '10000000-0000-0000-0000-000000000007',
  'Khar',
  4.90,
  142,
  'Eggless cupcakes, vegan cakes, birthday party boxes',
  ARRAY['Cupcakes', 'Birthday Cakes', 'Dessert Boxes', 'Vegan'],
  '₹600 – ₹3,800',
  600,
  3800,
  'https://instagram.com/tanvis_sugarstudio',
  '@tanvis_sugarstudio',
  NULL,
  '+91 98201 56789',
  '24-36 hours notice',
  ARRAY['100% Eggless kitchen', 'Vegan options', 'Refined sugar-free'],
  true,
  false,
  '{"dietary": "vegan_eggless", "focus": "cupcakes"}'::jsonb
),
(
  '30000000-0000-0000-0000-000000000006',
  'Kabir Merchant',
  'kabir-merchant',
  'South Mumbai artisan specializing in French laminated pastry, sourdough morning buns, and heritage dessert boxes celebrating timeless European techniques.',
  'Handcrafted croissants, almond frangipane tarts, and luxury breakfast pastry hampers delivered across South Mumbai.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
  '10000000-0000-0000-0000-000000000005',
  'Colaba',
  4.90,
  88,
  'French pastries, fruit tarts, artisanal dessert boxes',
  ARRAY['Pastries', 'Dessert Boxes', 'Cookies'],
  '₹850 – ₹4,200',
  850,
  4200,
  'https://instagram.com/kabir_patisserie_colaba',
  '@kabir_patisserie_colaba',
  NULL,
  '+91 98202 67890',
  '24 hours notice',
  ARRAY['Eggless available on selected tarts', 'Cultured French butter'],
  true,
  false,
  '{"technique": "viennoiserie", "heritage": "french"}'::jsonb
),
(
  '30000000-0000-0000-0000-000000000007',
  'Simran Wadhwa',
  'simran-wadhwa',
  'Lower Parel studio baker famous for showstopper chocolate bento cakes, custom geometric birthday cakes, and luxury dessert boxes for corporate & wedding gifting.',
  'Instagram-favorite bento cakes, velvet birthday tiers, and assorted luxury chocolate bonbon boxes.',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=1200&q=80',
  '10000000-0000-0000-0000-000000000006',
  'Lower Parel',
  4.80,
  116,
  'Bento cakes, custom celebration cakes, corporate hampers',
  ARRAY['Custom Cakes', 'Birthday Cakes', 'Dessert Boxes'],
  '₹800 – ₹5,000',
  800,
  5000,
  'https://instagram.com/simran_sweet_studio',
  '@simran_sweet_studio',
  NULL,
  '+91 98203 78901',
  '24-48 hours notice',
  ARRAY['100% Eggless available', 'Vegan cakes on request'],
  true,
  false,
  '{"aesthetic": "bento_geometric", "style": "modern"}'::jsonb
),
(
  '30000000-0000-0000-0000-000000000008',
  'Farhan Qureshi',
  'farhan-qureshi',
  'Culinary artist blending traditional heritage Indian flavours with French pastry techniques — creating saffron pistachio cheesecakes, cardamom chocolate entremets, and festive gift boxes.',
  'Fusion luxury confectionery: Kesar pista cheesecakes, filter coffee brownies, and festive artisanal dessert boxes.',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
  '10000000-0000-0000-0000-000000000008',
  'Dadar',
  4.90,
  92,
  'Fusion desserts, artisanal cheesecake, festive dessert boxes',
  ARRAY['Cheesecakes', 'Brownies', 'Dessert Boxes'],
  '₹950 – ₹4,500',
  950,
  4500,
  'https://instagram.com/farhans_confectionery',
  '@farhans_confectionery',
  NULL,
  '+91 98204 89012',
  '36 hours notice',
  ARRAY['100% Eggless kitchen', 'Traditional spices'],
  true,
  false,
  '{"style": "fusion_heritage", "flavours": ["kesar", "pista", "cardamom"]}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  short_description = EXCLUDED.short_description,
  profile_image = EXCLUDED.profile_image,
  cover_image = EXCLUDED.cover_image,
  location_id = EXCLUDED.location_id,
  area = EXCLUDED.area,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  specialties = EXCLUDED.specialties,
  specialty_tags = EXCLUDED.specialty_tags,
  price_range = EXCLUDED.price_range,
  price_min = EXCLUDED.price_min,
  price_max = EXCLUDED.price_max,
  instagram = EXCLUDED.instagram,
  instagram_handle = EXCLUDED.instagram_handle,
  website = EXCLUDED.website,
  phone = EXCLUDED.phone,
  lead_time = EXCLUDED.lead_time,
  dietary_options = EXCLUDED.dietary_options,
  verified = EXCLUDED.verified,
  is_featured = EXCLUDED.is_featured,
  features = EXCLUDED.features;

-- 4. DESSERTS
INSERT INTO desserts (id, baker_id, category_id, name, description, price, is_eggless, is_vegan, image_url) VALUES
(
  '40000000-0000-0000-0000-000000000001',
  '30000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  'Wildflower Berry Chiffon Cake',
  'Vanilla bean chiffon layered with fresh alpine raspberry compote and edible organic pressed pansies.',
  2400,
  true,
  false,
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80'
),
(
  '40000000-0000-0000-0000-000000000002',
  '30000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000002',
  '70% Valrhona Noir Birthday Tier',
  'Dark French chocolate sponge soaked in cold-brew espresso with whipped salted caramel core.',
  3200,
  true,
  false,
  'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80'
),
(
  '40000000-0000-0000-0000-000000000003',
  '30000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000006',
  'Triple Chocolate Sea Salt Brownie Box',
  'Box of 6 fudgy brownies baked with 55% Callebaut dark chocolate and Cornish sea salt flakes.',
  850,
  true,
  false,
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80'
),
(
  '40000000-0000-0000-0000-000000000004',
  '30000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000005',
  'NYC Stuffed Walnut Cookies (Pack of 4)',
  '150g jumbo warm cookies with molten chocolate cores and roasted Kashmiri walnuts.',
  650,
  true,
  false,
  'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80'
),
(
  '40000000-0000-0000-0000-000000000005',
  '30000000-0000-0000-0000-000000000003',
  '20000000-0000-0000-0000-000000000003',
  'Opulence 3-Tier Garden Wedding Cake',
  'Three-tiered Belgian white chocolate and Sicilian lemon curd cake with handmade wafer paper garden roses.',
  16500,
  true,
  false,
  'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80'
),
(
  '40000000-0000-0000-0000-000000000006',
  '30000000-0000-0000-0000-000000000004',
  '20000000-0000-0000-0000-000000000007',
  'Caramelized Basque Burnt Cheesecake',
  'Intentionally scorched exterior with a custardy, molten cream cheese center made with Philadelphia cream cheese.',
  1400,
  false,
  false,
  'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80'
),
(
  '40000000-0000-0000-0000-000000000007',
  '30000000-0000-0000-0000-000000000004',
  '20000000-0000-0000-0000-000000000008',
  'Alphonso Mango Pastry Tarts (Set of 4)',
  'Crisp butter sablé tart shells filled with vanilla bean diplomat cream and fresh Ratnagiri Alphonso mango slices.',
  950,
  true,
  false,
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
),
(
  '40000000-0000-0000-0000-000000000008',
  '30000000-0000-0000-0000-000000000005',
  '20000000-0000-0000-0000-000000000004',
  'Pistachio Raspberry Cupcake Box (Pack of 6)',
  'Fluffy eggless pistachio sponge filled with house raspberry coulis and topped with rose water buttercream.',
  900,
  true,
  true,
  'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=600&q=80'
),
(
  '40000000-0000-0000-0000-000000000009',
  '30000000-0000-0000-0000-000000000005',
  '20000000-0000-0000-0000-000000000002',
  'Belgian Truffle Birthday Cake',
  'Dense eggless dark chocolate cake frosted with 64% chocolate fudge and edible gold sprinkles.',
  1950,
  true,
  false,
  'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80'
),
(
  '40000000-0000-0000-0000-000000000010',
  '30000000-0000-0000-0000-000000000006',
  '20000000-0000-0000-0000-000000000009',
  'Morning Bakery & Pastry Edit Hamper',
  'Curated gift box with 2 almond croissants, 2 pain au chocolat, chocolate hazelnut madeleines, and raspberry financier.',
  1800,
  false,
  false,
  'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80'
),
(
  '40000000-0000-0000-0000-000000000011',
  '30000000-0000-0000-0000-000000000007',
  '20000000-0000-0000-0000-000000000002',
  'Vintage Aesthetic Korean Bento Cake',
  'Petite 350g vanilla sponge with pastel piping, customizable hand-piped message, and rich ganache core.',
  850,
  true,
  false,
  'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=600&q=80'
),
(
  '40000000-0000-0000-0000-000000000012',
  '30000000-0000-0000-0000-000000000008',
  '20000000-0000-0000-0000-000000000007',
  'Royal Kashmiri Kesar Pista Cheesecake',
  'Slow-baked saffron cream cheese over a crushed cardamom pistachio biscuit base.',
  1650,
  true,
  false,
  'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80'
)
ON CONFLICT (id) DO UPDATE SET
  baker_id = EXCLUDED.baker_id,
  category_id = EXCLUDED.category_id,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  is_eggless = EXCLUDED.is_eggless,
  is_vegan = EXCLUDED.is_vegan,
  image_url = EXCLUDED.image_url;

-- 5. REVIEWS
INSERT INTO reviews (id, baker_id, author, rating, comment, date, sentiment_score, sentiment_label, aspects) VALUES
(
  '50000000-0000-0000-0000-000000000001',
  '30000000-0000-0000-0000-000000000001',
  'Zoya Akhtar',
  5.0,
  'Aanya made our anniversary cake in Bandra. It was sheer poetry — stunning pressed flowers and the chocolate flavour was transcendent!',
  'Last week',
  0.96,
  'Delighted',
  ARRAY['Flavour', 'Aesthetics', 'Presentation']
),
(
  '50000000-0000-0000-0000-000000000002',
  '30000000-0000-0000-0000-000000000001',
  'Devang Parekh',
  4.8,
  'Flawless packaging and on-time doorstep delivery. Best eggless chocolate cake we have tasted in Mumbai.',
  '3 weeks ago',
  0.88,
  'Positive',
  ARRAY['Eggless', 'Packaging', 'Timeliness']
),
(
  '50000000-0000-0000-0000-000000000003',
  '30000000-0000-0000-0000-000000000002',
  'Kavita Shah',
  5.0,
  'These brownies are unbelievable. Fudgy, rich, crinkly on top, and under ₹1000 for a box of 6. A staple in our house!',
  '2 days ago',
  0.94,
  'Delighted',
  ARRAY['Value', 'Flavour', 'Texture']
),
(
  '50000000-0000-0000-0000-000000000004',
  '30000000-0000-0000-0000-000000000003',
  'Natasha Poonawalla',
  5.0,
  'Meher designed our reception cake in Juhu. Guests couldn''t stop taking pictures — every petal is crafted by hand!',
  '1 month ago',
  0.98,
  'Delighted',
  ARRAY['Luxury', 'Aesthetics', 'Craftsmanship']
),
(
  '50000000-0000-0000-0000-000000000005',
  '30000000-0000-0000-0000-000000000004',
  'Arjun Verma',
  4.8,
  'Her Basque cheesecake is the most authentic I''ve had in India. Silky and perfectly caramelized.',
  '2 weeks ago',
  0.91,
  'Delighted',
  ARRAY['Authenticity', 'Texture', 'Taste']
),
(
  '50000000-0000-0000-0000-000000000006',
  '30000000-0000-0000-0000-000000000005',
  'Meera Singhania',
  5.0,
  'Hard to believe these cupcakes are 100% vegan! Soft, moist, and not overly sweet. Ordering for every birthday now.',
  '3 days ago',
  0.95,
  'Delighted',
  ARRAY['Vegan', 'Texture', 'Balance']
),
(
  '50000000-0000-0000-0000-000000000007',
  '30000000-0000-0000-0000-000000000006',
  'Tara Deshmukh',
  5.0,
  'The pastry layers are sublime. Reminded me of Parisian patisseries right here in Colaba. Beautiful packaging too.',
  '5 days ago',
  0.93,
  'Delighted',
  ARRAY['Quality', 'Freshness', 'Authenticity']
),
(
  '50000000-0000-0000-0000-000000000008',
  '30000000-0000-0000-0000-000000000007',
  'Rhea Pillai',
  4.9,
  'Her bento cakes are so cute and taste divine! Ordered for my best friend in Lower Parel — arrived in pristine condition.',
  '1 week ago',
  0.92,
  'Delighted',
  ARRAY['Design', 'Taste', 'Packaging']
),
(
  '50000000-0000-0000-0000-000000000009',
  '30000000-0000-0000-0000-000000000008',
  'Manish Shah',
  5.0,
  'The kesar pista cheesecake was the highlight of our family Diwali celebration. Everyone wanted his contact!',
  '4 days ago',
  0.97,
  'Delighted',
  ARRAY['Flavour', 'Originality', 'Celebration']
)
ON CONFLICT (id) DO UPDATE SET
  baker_id = EXCLUDED.baker_id,
  author = EXCLUDED.author,
  rating = EXCLUDED.rating,
  comment = EXCLUDED.comment,
  date = EXCLUDED.date,
  sentiment_score = EXCLUDED.sentiment_score,
  sentiment_label = EXCLUDED.sentiment_label,
  aspects = EXCLUDED.aspects;
