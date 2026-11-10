"use client";

import { validatedCatalogReturnPath } from "@/lib/catalog-return";
import { useBrowserSearch } from "@/lib/browser-search";
import { BackNavigation } from "./back-navigation";

type PropertyDetailBackNavigationProps = {
  citySlug: string;
  propertyId: string;
  locations: readonly string[];
  label: string;
};

export function PropertyDetailBackNavigation({ citySlug, propertyId, locations, label }: PropertyDetailBackNavigationProps) {
  const search = useBrowserSearch();
  const returnTo = new URLSearchParams(search).get("returnTo");
  const href = validatedCatalogReturnPath(citySlug, propertyId, locations, returnTo);

  return <BackNavigation href={href} label={label} />;
}
