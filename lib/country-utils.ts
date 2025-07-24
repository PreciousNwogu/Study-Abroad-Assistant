// Country flag utility functions

export interface Country {
  code: string;
  name: string;
  flag: string;
  region: string;
  popular: boolean;
}

export interface Region {
  name: string;
  countries: Country[];
}

export const countries: Country[] = [
  // North America
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    region: "North America",
    popular: true,
  },
  {
    code: "US",
    name: "USA",
    flag: "🇺🇸",
    region: "North America",
    popular: true,
  },

  // Europe
  { code: "GB", name: "UK", flag: "🇬🇧", region: "Europe", popular: true },
  { code: "DE", name: "Germany", flag: "🇩🇪", region: "Europe", popular: true },
  { code: "FR", name: "France", flag: "🇫🇷", region: "Europe", popular: false },
  {
    code: "NL",
    name: "Netherlands",
    flag: "🇳🇱",
    region: "Europe",
    popular: false,
  },
  { code: "IE", name: "Ireland", flag: "🇮🇪", region: "Europe", popular: false },
  { code: "SE", name: "Sweden", flag: "🇸🇪", region: "Europe", popular: false },
  { code: "NO", name: "Norway", flag: "🇳🇴", region: "Europe", popular: false },
  { code: "DK", name: "Denmark", flag: "🇩🇰", region: "Europe", popular: false },

  // Oceania
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    popular: true,
  },
  {
    code: "NZ",
    name: "New Zealand",
    flag: "🇳🇿",
    region: "Oceania",
    popular: false,
  },

  // Asia
  { code: "SG", name: "Singapore", flag: "🇸🇬", region: "Asia", popular: false },
  { code: "JP", name: "Japan", flag: "🇯🇵", region: "Asia", popular: false },
  {
    code: "KR",
    name: "South Korea",
    flag: "🇰🇷",
    region: "Asia",
    popular: false,
  },
];

export const regions: Region[] = [
  {
    name: "North America",
    countries: countries.filter((c) => c.region === "North America"),
  },
  {
    name: "Europe",
    countries: countries.filter((c) => c.region === "Europe"),
  },
  {
    name: "Oceania",
    countries: countries.filter((c) => c.region === "Oceania"),
  },
  {
    name: "Asia",
    countries: countries.filter((c) => c.region === "Asia"),
  },
];

/**
 * Get popular study destinations
 */
export function getPopularCountries(): Country[] {
  return countries.filter((c) => c.popular);
}

/**
 * Get countries by region
 */
export function getCountriesByRegion(regionName: string): Country[] {
  return countries.filter((c) => c.region === regionName);
}

/**
 * Get country flag emoji by country name
 */
export function getCountryFlag(countryName: string): string {
  const country = countries.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );
  return country?.flag || "🌍"; // Default flag for unknown countries
}

/**
 * Get country with flag display text
 */
export function getCountryWithFlag(countryName: string): string {
  const flag = getCountryFlag(countryName);
  return `${flag} ${countryName}`;
}

/**
 * Get country by name
 */
export function getCountryByName(countryName: string): Country | null {
  return (
    countries.find((c) => c.name.toLowerCase() === countryName.toLowerCase()) ||
    null
  );
}

/**
 * Get all countries with flags for display
 */
export function getCountriesWithFlags(): Array<{
  value: string;
  label: string;
  flag: string;
  region: string;
  popular: boolean;
}> {
  return countries.map((country) => ({
    value: country.name,
    label: `${country.flag} ${country.name}`,
    flag: country.flag,
    region: country.region,
    popular: country.popular,
  }));
}

/**
 * Check if agent support exists for a country
 */
export function hasAgentSupport(countryName: string): boolean {
  const supportedCountries = ["Canada", "USA", "UK", "Germany", "Australia"];
  return supportedCountries.includes(countryName);
}
