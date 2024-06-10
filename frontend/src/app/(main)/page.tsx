import { Header } from "@/app/(main)/_components/Header";
import { Box } from "@/components/layout/Box";
import { Advantages } from "./_components/Advantages";
import { PopularCities } from "./_components/PopularCities";
import { PopularTours } from "./_components/PopularTours";

const MainPage = async () => {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-3">
        <PopularCities />
        <Advantages />
        <PopularTours />
        <Box as="div" className="h-[10px] bg-background-400" />
      </div>
    </>
  );
};

export default MainPage;
