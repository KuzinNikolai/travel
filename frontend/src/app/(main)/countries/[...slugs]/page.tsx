import { IDetailCity } from "@/entities/travel/City.entity";
import { IDetailTour } from "@/entities/travel/Tour.entity";
import { getCityDetail } from "@/packages/API/fetches/cities";
import { getDetailTour } from "@/packages/API/fetches/tours";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { FC } from "react";
import { Tour } from "./_pages/Tour";
import { Tours } from "./_pages/tours";
import { redirectBack } from "./utils/redirectBack";

export const dynamicParams = true;

interface IDynamicPagesProps {
  params: {
    slugs: string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Navigator: FC<IDynamicPagesProps> = async ({ params }) => {
  var [country, city, tour] = params.slugs;
  var pageType = getPageType(params.slugs);

  if (!pageType) {
    return redirect("/");
  }

  var data = await getDataBySlag(params.slugs, pageType);

  if (data === false) {
    redirectBack(country, city, tour);
  }

  return {
    cities: null,
    tours: <Tours cityDetail={data as IDetailCity} />,
    tour: <Tour tour={data as IDetailTour} />,
  }[pageType];
};

export default Navigator;

export async function generateMetadata({
  params,
}: IDynamicPagesProps): Promise<Metadata> {
  var pageType = getPageType(params.slugs);
  var data = await getDataBySlag(params.slugs, pageType);

  if (!data) {
    return {};
  }

  var title = (
    {
      cities: `Список городов в ${data.title}`,
      tours: `Список туров в ${data.title}`,
      tour: `Тур ${data.title} в городе ${(data as IDetailTour).city}`,
    } satisfies Record<PageType, string>
  )[pageType];

  var keywords = (
    {
      cities: ``,
      tours: `Экскурсии, ${(data as IDetailCity).name}, ${data.title}`,
      tour: `Экскурсии ${data.title}, ${data.title}`,
    } satisfies Record<PageType, string>
  )[pageType];

  return {
    title,
    description: data.description || "",
    keywords,
  };
}

const pageTypes = ["cities", "tours", "tour"] as const;
type PageType = (typeof pageTypes)[number];

function getPageType(slugs: string[]): PageType {
  return pageTypes[slugs.length - 1];
}

const fetchData = {
  cities: null,
  tours: async (city: string) => (await getCityDetail(city)) || false,
  tour: async (tour: string) => (await getDetailTour(tour)) || false,
};

async function getDataBySlag(slugs: string[], pageType: PageType) {
  const [country, city, tour] = slugs;

  var pageSlug = {
    cities: country,
    tours: city,
    tour,
  }[pageType];

  return await fetchData[pageType]?.(pageSlug);
}
