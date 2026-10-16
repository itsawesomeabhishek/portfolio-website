-- ==============================================================================
-- Portfolio Database Schema for Supabase (PostgreSQL)
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  hashed_password TEXT NOT NULL,
  name TEXT DEFAULT 'Abhishek',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Identity (Singleton)
CREATE TABLE IF NOT EXISTS identity (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  name TEXT NOT NULL,
  handle TEXT NOT NULL,
  logo TEXT NOT NULL,
  headline_solid TEXT NOT NULL,
  headline_outlined TEXT NOT NULL,
  hero_status TEXT NOT NULL,
  role_banner_intro TEXT NOT NULL,
  role_banner_skills TEXT NOT NULL,
  terminal_title TEXT NOT NULL,
  whoami TEXT[] NOT NULL DEFAULT '{}',
  location TEXT NOT NULL,
  status TEXT NOT NULL,
  bio TEXT[] NOT NULL DEFAULT '{}',
  avatar TEXT NOT NULL,
  resume TEXT NOT NULL,
  site_url TEXT NOT NULL,
  description TEXT NOT NULL,
  copyright_year INT NOT NULL DEFAULT 2026,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tech Stack
CREATE TABLE IF NOT EXISTS stack_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  tech TEXT NOT NULL,
  icon TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image TEXT NOT NULL,
  alt TEXT NOT NULL,
  live TEXT,
  github TEXT,
  placeholder BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  points TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Stat Cards
CREATE TABLE IF NOT EXISTS stat_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  note TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Education
CREATE TABLE IF NOT EXISTS education (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  school TEXT NOT NULL,
  degree TEXT NOT NULL,
  start TEXT NOT NULL,
  end_date TEXT NOT NULL,
  facts TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Certificates
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  image TEXT NOT NULL,
  alt TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Quotes
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Contact & Socials
CREATE TABLE IF NOT EXISTS contact_info (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  email TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS socials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. Navigation Links
CREATE TABLE IF NOT EXISTS nav_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- 12. Site Config
CREATE TABLE IF NOT EXISTS site_config (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  github_profile TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- Enable Row Level Security (RLS) - Public Read Access
-- ==============================================================================
ALTER TABLE identity ENABLE ROW LEVEL SECURITY;
ALTER TABLE stack_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE stat_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE socials ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all content tables for site visitors
CREATE POLICY "Public read identity" ON identity FOR SELECT USING (true);
CREATE POLICY "Public read stack_nodes" ON stack_nodes FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read stat_cards" ON stat_cards FOR SELECT USING (true);
CREATE POLICY "Public read education" ON education FOR SELECT USING (true);
CREATE POLICY "Public read certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Public read quotes" ON quotes FOR SELECT USING (true);
CREATE POLICY "Public read contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Public read socials" ON socials FOR SELECT USING (true);
CREATE POLICY "Public read nav_links" ON nav_links FOR SELECT USING (true);
CREATE POLICY "Public read site_config" ON site_config FOR SELECT USING (true);

-- Allow full access to service_role / authenticated users
CREATE POLICY "Service write identity" ON identity FOR ALL USING (true);
CREATE POLICY "Service write stack_nodes" ON stack_nodes FOR ALL USING (true);
CREATE POLICY "Service write projects" ON projects FOR ALL USING (true);
CREATE POLICY "Service write services" ON services FOR ALL USING (true);
CREATE POLICY "Service write stat_cards" ON stat_cards FOR ALL USING (true);
CREATE POLICY "Service write education" ON education FOR ALL USING (true);
CREATE POLICY "Service write certificates" ON certificates FOR ALL USING (true);
CREATE POLICY "Service write quotes" ON quotes FOR ALL USING (true);
CREATE POLICY "Service write contact_info" ON contact_info FOR ALL USING (true);
CREATE POLICY "Service write socials" ON socials FOR ALL USING (true);
CREATE POLICY "Service write nav_links" ON nav_links FOR ALL USING (true);
CREATE POLICY "Service write site_config" ON site_config FOR ALL USING (true);
