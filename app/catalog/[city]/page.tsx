import { MortgageCalculator } from "@/components/mortgage-calculator";
import { CityCatalog } from "@/components/city-catalog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalogCities, getCatalogCity } from "@/content/catalog-cities";

export function generateStaticParams() {
  return catalogCities.map(({ slug }) => ({ city: slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCatalogCity(city);
  return cityData ? { title: cityData.heading, description: cityData.note } : {};
}

export default async function CityCatalogPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = getCatalogCity(city);
  if (!cityData) notFound();

  return (
    <main id="content">
      <CityCatalog key={cityData.slug} city={cityData} />
      <MortgageCalculator cityName={cityData.name} headingLevel="h2" />
    </main>
  );
}
