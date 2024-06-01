import { Box } from "@/components/Box"
import { Advantages } from "./_components/Advantages"
import { PopularCities } from "./_components/PopularCities"
import { PopularTours } from "./_components/PopularTours"

const LandingPage = () => {
  return (
    // TODO: Remove h-screen class
    <div className="flex flex-col gap-3">
      <PopularCities />
      <Advantages />
      <PopularTours />
      <Box as="div" className="h-[10px]" />
    </div>
  )
}

export default LandingPage