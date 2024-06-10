import { Box } from "@/components/layout/Box";
import { Tour } from "@/components/share/Tour";
import { getDetailCity } from "@/packages/API/fetches/cities";
import { HistoryBack } from "@/packages/utils/HistoryBack";
import { IPagesProps } from "@/packages/utilsTypes/pageProps";
import { Metadata } from "next";
import { FC } from "react";
import { Header } from "./_components/Header";

const ToursInCity: FC<IPagesProps<{ city: string }>> = async ({ params }) => {
  var city = await getDetailCity(params.city);

  if (!city) {
    return ;
  }

  return (
    <Box className="flex flex-col gap-3">
      {/* <JsonLD schema={generateToursJsonLd(cityDetail)} /> */}
      <Box
        className="w-full h-full flex flex-col bg-background-400"
        as="section"
      >
        <Header title={`Туры в ${city.name}`} />
        <div className="container flex flex-col gap-4 pb-5">
          -- filter --
          {city?.tours.map((tour) => (
            <Tour key={tour.id + tour.slug} tour={tour} />
          ))}
        </div>
      </Box>
      <Box className="w-full h-[10px] bg-background-400"></Box>
    </Box>
  );
};

export default ToursInCity;

export async function generateMetadata({
  params,
}: IPagesProps): Promise<Metadata> {
  if (!params.slug) {
    return {};
  }

  const city = await getDetailCity(params.slug);

  if (!city) {
    return {};
  }

  return {
    title: `Экскурсии в городе ${city.title}`,
    description: city.description || "",
    keywords: `Экскурсии в ${city.title}, ${city.title}, Город ${city.title}`,
  };
}
