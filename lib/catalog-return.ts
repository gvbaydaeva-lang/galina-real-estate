export function catalogReturnPath(citySlug: string, propertyId: string, district = "") {
  const query = district ? `?district=${encodeURIComponent(district)}` : "";
  return `/catalog/${citySlug}${query}#property-${propertyId}`;
}

export function selectedDistrictFromSearch(search: string, locations: readonly string[]) {
  const district = new URLSearchParams(search).get("district") ?? "";
  return locations.includes(district) ? district : "";
}

export function validatedCatalogReturnPath(
  citySlug: string,
  propertyId: string,
  propertyDistrict: string,
  locations: readonly string[],
  returnTo: string | null,
) {
  const fallback = `/catalog/${citySlug}`;
  if (!returnTo) return fallback;

  const [pathWithSearch, hash = ""] = returnTo.split("#", 2);
  const [pathname, search = ""] = pathWithSearch.split("?", 2);

  if (pathname !== fallback || hash !== `property-${propertyId}`) return fallback;

  const district = selectedDistrictFromSearch(search, locations);
  if (search && district !== propertyDistrict) return fallback;

  return catalogReturnPath(citySlug, propertyId, district);
}
