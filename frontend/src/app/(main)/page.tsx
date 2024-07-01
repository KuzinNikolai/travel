import { Header } from "@/app/(main)/_components/Header"
import { AuthBase } from "@/widgets/Auth"
import { Advantages } from "./_components/Advantages"
import { PopularCities } from "./_components/PopularCities"
import { PopularTours } from "./_components/PopularTours"

const MainPage = async () => {
	return (
		<>
			<AuthBase />
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
