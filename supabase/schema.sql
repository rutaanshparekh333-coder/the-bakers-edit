-- ==========================================================
-- THE BAKER'S EDIT - SUPABASE DATABASE SCHEMA
-- Curated Home-Baker Discovery Platform for Mumbai
-- Includes Data Science, NLP & Sentiment Analysis structures
-- ==========================================================

-- Enable extension for vector embeddings (if pgvector is enabled in Supabase)
-- CREATE EXTENSION IF NOT EXISTS vector;

-- 1. LOCATIONS TABLE
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE, -- e.g. "Bandra West", "Juhu", "Colaba"
  zone TEXT NOT NULL, -- "Western Suburbs", "South Mumbai", "Eastern Suburbs"
  city TEXT NOT NULL DEFAULT 'Mumbai',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE, -- e.g. "Custom Cakes", "Wedding Cakes"
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
  area TEXT NOT NULL, -- e.g. "Bandra West, Mumbai"
  rating NUMERIC(3, 2) DEFAULT 5.00 CHECK (rating >= 0 AND rating <= 5.00),
  review_count INT DEFAULT 0,
  specialties TEXT NOT NULL,
  specialty_tags TEXT[] DEFAULT '{}',
  price_range TEXT NOT NULL, -- e.g. "₹1,800 – ₹6,500"
  price_min INT NOT NULL DEFAULT 0,
  price_max INT NOT NULL DEFAULT 10000,
  instagram TEXT NOT NULL, -- e.g. "https://instagram.com/aanya.bakes"
  instagram_handle TEXT NOT NULL, -- e.g. "@aanya.bakes"
  website TEXT,
  phone TEXT,
  lead_time TEXT DEFAULT '24-48 hours notice',
  dietary_options TEXT[] DEFAULT '{}', -- e.g. ARRAY['Eggless available', 'Vegan options']
  verified BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  -- Data Science & NLP Fields:
  -- embedding vector(1536), -- Uncomment when pgvector is active
  features JSONB DEFAULT '{}'::jsonb, -- Stored feature vector for content-based recommendations
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

-- 5. REVIEWS TABLE (With Sentiment Analysis Architecture)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  baker_id UUID NOT NULL REFERENCES bakers(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  rating NUMERIC(2, 1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  date TEXT NOT NULL,
  
  -- Data Science / Sentiment Analysis Columns:
  sentiment_score NUMERIC(3, 2) DEFAULT 0.0 CHECK (sentiment_score >= -1.0 AND sentiment_score <= 1.0),
  sentiment_label TEXT DEFAULT 'Positive' CHECK (sentiment_label IN ('Delighted', 'Positive', 'Neutral', 'Negative')),
  aspects TEXT[] DEFAULT '{}', -- Aspect-based sentiment: ARRAY['Flavour', 'Packaging', 'Timeliness']
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES for fast discovery & search
CREATE INDEX IF NOT EXISTS idx_bakers_area ON bakers(area);
CREATE INDEX IF NOT EXISTS idx_bakers_rating ON bakers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_bakers_price_min ON bakers(price_min);
CREATE INDEX IF NOT EXISTS idx_bakers_price_max ON bakers(price_max);
CREATE INDEX IF NOT EXISTS idx_desserts_baker_id ON desserts(baker_id);
CREATE INDEX IF NOT EXISTS idx_reviews_baker_id ON reviews(baker_id);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE bakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE desserts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Allow public read access to locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to bakers" ON bakers FOR SELECT USING (true);
CREATE POLICY "Allow public read access to desserts" ON desserts FOR SELECT USING (true);
CREATE POLICY "Allow public read access to reviews" ON reviews FOR SELECT USING (true);

-- Insert seed data for locations
INSERT INTO locations (name, zone) VALUES
  ('Bandra West', 'Western Suburbs'),
  ('Juhu', 'Western Suburbs'),
  ('Andheri West', 'Western Suburbs'),
  ('Powai', 'Eastern Suburbs'),
  ('Colaba', 'South Mumbai'),
  ('Lower Parel', 'South Mumbai'),
  ('Khar', 'Western Suburbs'),
  ('Dadar', 'South Mumbai')
ON CONFLICT (name) DO NOTHING;
