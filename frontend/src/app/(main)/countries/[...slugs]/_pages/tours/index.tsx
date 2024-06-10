import { Box } from "@/components/layout/Box";
import { JsonLD } from "@/components/GenerateJsonLD";
import { Tour } from "@/components/share/Tour";
import { IDetailCity } from "@/entities/travel/City.entity";
import { FC } from "react";
import { Header } from "../../_components/Header";
import { generateToursJsonLd } from "./jsonld";

interface IToursProps {
  cityDetail: IDetailCity;
}

export const Tours: FC<IToursProps> = async ({ cityDetail }) => {
  return (
    <Box className="flex flex-col gap-3">
      {/* <JsonLD schema={generateToursJsonLd(cityDetail)} /> */}
      <Box
        className="w-full h-full flex flex-col bg-background-400"
        as="section"
      >
        <Header title={`Туры в ${cityDetail.name}`} />
        <div className="container flex flex-col gap-4 pb-5">
          -- filter --
          {cityDetail?.tours.map((tour) => (
            <Tour key={tour.id + tour.slug} tour={tour} />
          ))}
        </div>
      </Box>
      <Box className="w-full h-[10px] bg-background-400"></Box>
    </Box>
  );
};
