import { Auth } from "@widget/Auth"
import { Advantages } from "./components/Advantages"
import { Header } from "./components/Header"
import { PopularCities } from "./components/PopularCities"
import { PopularTours } from "./components/PopularTours"

export const MainPage = () => {
	return (
		<>
			<Auth />
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
