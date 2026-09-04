/**
 * Pusat data entitas "Desa Wringinanom, Kecamatan Tongas, Kabupaten Probolinggo".
 *
 * Semua angka di bawah berasal dari sumber resmi yang terverifikasi:
 * - Wikidata Q14754551 (kode BPS, kode Kemendagri, koordinat centroid desa)
 * - Data D1 tabel `identitas` (alamat, kontak, social)
 * - Google Maps embed "Kantor Pemerintah Desa Wringinanom" (koordinat kantor)
 *
 * Dipakai untuk JSON-LD, metadata, dan konten disambiguasi entitas
 * (memisahkan dari Wringinanom Kec. Gresik, Wonosobo, Malang, dll).
 */

export const SITE_URL = "https://portal-wringinanom.web.id";
export const SITE_NAME = "Desa Wringinanom";
export const ORG_NAME = "Pemerintah Desa Wringinanom";

export const ENTITY = {
  name: SITE_NAME,
  officialName: "Desa Wringinanom",
  alternateName: ["Wringin Anom", "Desa Wringin Anom"],
  description:
    "Desa Wringinanom adalah desa di Kecamatan Tongas, Kabupaten Probolinggo, Jawa Timur, Indonesia. Berbeda dengan Kecamatan Wringinanom di Kabupaten Gresik.",
  url: SITE_URL,
  inLanguage: "id",
} as const;

/** Kode wilayah resmi (Wikidata Q14754551 → P2588/P1588, ref BPS & Permendagri). */
export const REGION_CODES = {
  /** Kode Kemendagri: 35 (Jatim) . 13 (Kab. Probolinggo) . 23 (Kec. Tongas) . 2006 */
  kemendagri: "35.13.23.2006",
  /** Kode BPS */
  bps: "3513230008",
  /** Kode pos */
  postalCode: "67252",
} as const;

/** GeoCoordinates — centroid desa (Wikidata P625). */
export const GEO_VILLAGE = {
  latitude: -7.7558333333333,
  longitude: 113.105,
} as const;

/** GeoCoordinates — lokasi Balai Desa / kantor pemerintahan (Google Maps embed). */
export const GEO_OFFICE = {
  latitude: -7.753483592265074,
  longitude: 113.10343867597148,
} as const;

/** Referensi entitas eksternal (Wikidata Q14754551). */
export const EXTERNAL_REFS = {
  wikidata: "https://www.wikidata.org/wiki/Q14754551",
  wikipedia:
    "https://id.wikipedia.org/wiki/Wringinanom,_Tongas,_Probolinggo",
  /** Wikidata Q10853500 = Kecamatan Tongas, Kabupaten Probolinggo */
  kecamatanTongasWikidata: "https://www.wikidata.org/wiki/Q10853500",
  /** Wikidata Q648094 = Kabupaten Probolinggo */
  kabupatenProbolinggoWikidata: "https://www.wikidata.org/wiki/Q648094",
  geoNames: "https://www.geonames.org/6778640",
} as const;

/** Alamat lengkap NAP (Name-Address-Phone) konsisten untuk seluruh payload. */
export const NAP = {
  street: "Balai Desa Wringinanom",
  locality: "Tongas",
  region: "Jawa Timur",
  regionCode: "JI",
  country: "ID",
  countryName: "Indonesia",
  full: "Balai Desa Wringinanom, Kec. Tongas, Kab. Probolinggo, Jawa Timur, Kode Pos 67252",
} as const;

/**
 * @type {GovernmentOrganization} Pemerintah Desa.
 * Schema.org: https://schema.org/GovernmentOrganization
 */
export function buildGovernmentOrganization(identitas?: {
  email?: string;
  noWa?: string;
  logoDesaUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}) {
  const sameAs = [
    EXTERNAL_REFS.wikidata,
    EXTERNAL_REFS.wikipedia,
    identitas?.facebookUrl || "https://www.facebook.com/pemdeswringinanom",
    identitas?.instagramUrl || "https://www.instagram.com/pemdeswringinanom85/",
  ].filter(Boolean);

  return {
    "@type": "GovernmentOrganization",
    "@id": `${SITE_URL}/#government-organization`,
    name: ORG_NAME,
    url: SITE_URL,
    logo: identitas?.logoDesaUrl || undefined,
    email: identitas?.email || undefined,
    telephone: identitas?.noWa ? `+${String(identitas.noWa).replace(/\D/g, "")}` : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.street,
      addressLocality: NAP.locality,
      addressRegion: NAP.region,
      postalCode: REGION_CODES.postalCode,
      addressCountry: NAP.country,
    },
    areaServed: { "@id": `${SITE_URL}/#village` },
    parentOrganization: {
      "@type": "GovernmentOrganization",
      name: "Pemerintah Kabupaten Probolinggo",
      sameAs: "https://www.probolinggokab.go.id/",
    },
    sameAs,
  };
}

/**
 * @type {AdministrativeArea} Entitas desa.
 */
export function buildVillageAdministrativeArea() {
  return {
    "@type": ["AdministrativeArea", "Place"],
    "@id": `${SITE_URL}/#village`,
    name: ENTITY.name,
    alternateName: ENTITY.alternateName,
    description: ENTITY.description,
    url: SITE_URL,
    identifier: [
      { "@type": "PropertyValue", name: "Kode Kemendagri", value: REGION_CODES.kemendagri },
      { "@type": "PropertyValue", name: "Kode BPS", value: REGION_CODES.bps },
      { "@type": "PropertyValue", name: "Kode Pos", value: REGION_CODES.postalCode },
      { "@type": "PropertyValue", name: "Wikidata", value: "Q14754551" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wringinanom, Tongas",
      addressRegion: NAP.region,
      postalCode: REGION_CODES.postalCode,
      addressCountry: NAP.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO_VILLAGE.latitude,
      longitude: GEO_VILLAGE.longitude,
      elevationMeters: 32,
    },
    containedInPlace: [
      {
        "@type": "AdministrativeArea",
        name: "Kecamatan Tongas",
        sameAs: EXTERNAL_REFS.kecamatanTongasWikidata,
      },
      {
        "@type": "AdministrativeArea",
        name: "Kabupaten Probolinggo",
        sameAs: EXTERNAL_REFS.kabupatenProbolinggoWikidata,
      },
      { "@type": "AdministrativeArea", name: "Jawa Timur", sameAs: "https://www.wikidata.org/wiki/Q4059" },
      { "@type": "Country", name: "Indonesia", sameAs: "https://www.wikidata.org/wiki/Q252" },
    ],
    sameAs: [EXTERNAL_REFS.wikidata, EXTERNAL_REFS.wikipedia, EXTERNAL_REFS.geoNames],
    /* Disambiguasi eksplisit dalam Knowledge Graph */
    disambiguatingDescription:
      "Desa Wringinanom di Kecamatan Tongas, Kabupaten Probolinggo — bukan Kecamatan Wringinanom di Kabupaten Gresik.",
  };
}

/** Graph JSON-LD global untuk root/public layout. */
export function buildGlobalGraph(identitas?: {
  email?: string;
  noWa?: string;
  logoDesaUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}) {
  const org = buildGovernmentOrganization(identitas);
  const village = buildVillageAdministrativeArea();
  return {
    "@context": "https://schema.org",
    "@graph": [
      village,
      org,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${ENTITY.name} — Portal Resmi Pemerintah Desa`,
        inLanguage: ENTITY.inLanguage,
        publisher: { "@id": org["@id"] },
        about: { "@id": village["@id"] },
      },
    ],
  };
}

/** BreadcrumbList. items: [{ name, url }] tanpa @context/@type. */
export function buildBreadcrumb(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: `${SITE_URL}${item.url}` } : {}),
    })),
  };
}

/** NewsArticle JSON-LD untuk halaman berita. */
export function buildNewsArticle(opts: {
  url: string;
  judul: string;
  ringkasan: string;
  fotoUrl?: string;
  penulis: string;
  tanggal: string;
}) {
  const published = parseTanggalIndo(opts.tanggal) || undefined;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${opts.url}#article`,
    headline: opts.judul.slice(0, 110),
    description: opts.ringkasan,
    ...(opts.fotoUrl ? { image: [opts.fotoUrl] } : {}),
    datePublished: published?.toISOString(),
    dateModified: published?.toISOString(),
    inLanguage: ENTITY.inLanguage,
    author: { "@type": "Person", name: opts.penulis || "Pemerintah Desa Wringinanom" },
    publisher: {
      "@type": "GovernmentOrganization",
      "@id": `${SITE_URL}/#government-organization`,
      name: ORG_NAME,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
    articleSection: "Kabar Desa",
  };
}

/** FAQPage JSON-LD — pasangan dari konten FAQ visible. */
export function buildFaqPage(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Person JSON-LD untuk pejabat desa. */
export function buildPerson(opts: { name: string; jobTitle: string; fotoUrl?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    jobTitle: opts.jobTitle,
    ...(opts.fotoUrl ? { image: opts.fotoUrl } : {}),
    worksFor: { "@id": `${SITE_URL}/#government-organization` },
  };
}

/**
 * Parse tanggal Indonesia ("30 Agustus 2026") atau ISO ("2026-04-26") → Date.
 * Mengembalikan null jika gagal.
 */
export function parseTanggalIndo(tanggal: string): Date | null {
  if (!tanggal) return null;
  const iso = tanggal.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    const d = new Date(Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])));
    return isNaN(d.getTime()) ? null : d;
  }
  const bulan: Record<string, number> = {
    januari: 0, februari: 1, maret: 2, april: 3, mei: 4, juni: 5,
    juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11,
  };
  const idn = tanggal.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (idn) {
    const m = bulan[idn[2]!.toLowerCase()];
    if (m !== undefined) return new Date(Date.UTC(Number(idn[3]), m, Number(idn[1])));
  }
  return null;
}

/** Teks disambiguasi standar untuk konten visible. */
export const DISAMBIGUATION_TEXT =
  "Desa Wringinanom yang dikelola melalui portal ini adalah desa di Kecamatan Tongas, " +
  "Kabupaten Probolinggo, Jawa Timur (kode wilayah " + REGION_CODES.kemendagri +
  ", kode pos " + REGION_CODES.postalCode + "). Desa ini berbeda dengan Kecamatan Wringinanom " +
  "di Kabupaten Gresik, maupun desa bernama Wringinanom di Wonosobo, Malang, Situbondo, dan Ponorogo.";
