import { ISearchGroup, ISearchItem } from "@/entities/search.entity";
import { getCities } from "@/packages/API/fetches/cities";
import { getTours } from "@/packages/API/fetches/tours";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")?.toLowerCase();

  const resBody = [] as ISearchGroup[];

  const [cities, tours] = await Promise.all([getCities(), await getTours()]);

  const searchedTours = tours
    ?.filter((tour) => tour.title.toLowerCase().includes(query || ""))
    .map<ISearchItem>((tour) => ({
      title: tour.title,
      tourSlug: tour.slug,
      citySlug: tour.city_slug,
    }));

  const searchedCities = cities
    ?.filter((city) => city.name.toLowerCase().includes(query || ""))
    .map<ISearchItem>((city) => ({
      title: city.name,
      citySlug: city.slug,
    }));

  const searchGroups = new Map<string, ISearchGroup>();

  const setSearchItem = (searchItem: ISearchItem) => {
    if (!searchGroups.has(searchItem.citySlug)) {
      searchGroups.set(searchItem.citySlug, {
        id: searchItem.citySlug,
        items: [],
      });
    }

    searchGroups.get(searchItem.citySlug)?.items.push(searchItem);
  };

  searchedTours?.forEach(setSearchItem);
  searchedCities?.forEach(setSearchItem);

  resBody.push(
    ...Array.from(searchGroups.entries()).map(([_, group]) => {
      group.items.sort((searchItem) => (searchItem.tourSlug ? 0 : -1));

      return group;
    })
  );

  return NextResponse.json(resBody);
}
