import { Auth } from "@widget/Auth"
import { Advantages } from "./_components/Advantages"
import { Header } from "./_components/Header"
import { PopularCities } from "./_components/PopularCities"
import { PopularTours } from "./_components/PopularTours"

const MainPage = async () => {
	return (
		<>
			<Header />
			<main className='flex flex-col gap-3'>
				<PopularCities />
				<Advantages />
				<PopularTours />
				<div className='h-[10px] bg-background-400' />
			</main>
		</>
	)
}

export default MainPage
