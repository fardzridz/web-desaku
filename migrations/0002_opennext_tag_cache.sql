-- Tabel internal OpenNext D1 tag cache (jangan diubah manual)
-- Required by @opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache
CREATE TABLE IF NOT EXISTS revalidations (
  tag TEXT NOT NULL,
  revalidatedAt INTEGER NOT NULL,
  stale INTEGER,
  expire INTEGER DEFAULT NULL,
  UNIQUE(tag) ON CONFLICT REPLACE
);
