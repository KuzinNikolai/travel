import { Button } from "@share/ui/Buttons"
import { Icon, type IconsName } from "@share/ui/Icon"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"
import Link from "next/link"
import type { FC } from "react"

export const metadata = {
	title: "Become guide",
}

export const dynamic = "force-static"

interface OfferTourItemProps {
	icon: IconsName
	label: string
	description: string
}

const OfferTourItem: FC<OfferTourItemProps> = ({ label, description, icon }) => {
	return (
		<li className='flex gap-3'>
			<Icon
				name={icon}
				className='mt-1 min-h-9 min-w-9'
			/>
			<div className='flex flex-col gap-1'>
				<Typography
					variant='h4'
					as='h3'
					className='text'
				>
					{label}
				</Typography>
				<Typography
					variant='content1'
					className='text-primary-400'
				>
					{description}
				</Typography>
			</div>
		</li>
	)
}

const BecomeGuidePage = () => {
	return (
		<>
			<HeaderWithBack title='Become guide' />
			<Section
				title='Become guide'
				hiddenTitle
				containerClassNames='flex flex-col gap-5'
			>
				<div className='space-y-4'>
					<Typography
						variant='h2'
						as='h1'
					>
						GetTrip - Онлайн сервис по поиску экскурсий, туров.
					</Typography>
					<Typography
						variant='content1'
						className='text-primary-400'
					>
						Сервис GetTrip – это инновационная платформа, где путешественники могут легко найти и заказать туры и
						экскурсии у местных гидов и компаний. Присоединяйтесь к нашему динамичному сообществу любителей путешествий,
						делитесь своими знаниями, знакомьтесь с интересными людьми и зарабатывайте, занимаясь любимым делом! GetTrip
						помогает вам открывать новые горизонты, создавая незабываемые впечатления для вас и ваших гостей.
					</Typography>
				</div>
				<div className='space-y-4'>
					<Typography
						variant='h3'
						as='h2'
					>
						Кто может стать гидом?
					</Typography>
					<Typography
						variant='content1'
						className='text-primary-400'
					>
						Мы приглашаем как профессиональных гидов, так и любителей, знающих свой город и увлечённых проводить
						экскурсии. Присоединяйтесь к нам и поделитесь своей страстью и знаниями, чтобы создавать уникальные и
						запоминающиеся экскурсии и туры.
					</Typography>
				</div>
				<div className='space-y-4'>
					<Typography
						variant='h3'
						as='h2'
					>
						Как предложить свою экскурсию?
					</Typography>
					<ul className='flex list-none flex-col gap-4'>
						<OfferTourItem
							label='Отправка тура'
							description='Мы придаем особое значение ясной концепции экскурсии, которая отражает ваш уникальный взгляд на город, место проведения экскурсии'
							icon='ImageUp'
						/>
						<OfferTourItem
							label='Ответ'
							description='После получения заявки мы свяжемся с вами, чтобы обсудить соответствие наших критериев экскурс экскурсии и договориться о дальнейших шагах.'
							icon='View'
						/>
						<OfferTourItem
							label='Звонок'
							description='Мы проведем звонок для обсуждения ключевых идей, содержания экскурсии и условий сотрудничества'
							icon='PhoneIncoming'
						/>
						<OfferTourItem
							label='Размещение на сайте'
							description='Мы создадим описание экскурсии, которое максимально привлечет внимание клиентов, и опубликуем информацию на нашем сайте для максимальной доступности.'
							icon='BookUp'
						/>
					</ul>
				</div>
				<Button
					variant='outline'
					className='my-5'
					asChild
				>
					<Link href='/profile/become-guide/become'>Стать гидом</Link>
				</Button>
				<div className='space-y-2'>
					<Typography
						variant='h3'
						as='h2'
					>
						Как мы работаем?
					</Typography>
					<Typography
						variant='content1'
						className='text-primary-400'
					>
						Размещение ваших предложений на нашем сайте бесплатно. Мы тщательно подходим к выбору экскурсий, публикуя
						только те, которые отвечают актуальному спросу. Комиссия с продажи ваших экскурсий Мы берем комиссию в
						размере 20% от стоимости каждого заказа экскурсий. Мы вкладываем деньги в продвижение экскурсий, а вы
						отвечаете за их проведение
					</Typography>
				</div>
				<Button
					variant='outline'
					className='my-5'
					asChild
				>
					<Link href='/profile/become-guide/become'>Стать гидом</Link>
				</Button>
			</Section>
		</>
	)
}

export default BecomeGuidePage
