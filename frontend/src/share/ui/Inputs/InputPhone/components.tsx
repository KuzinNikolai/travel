import { cn } from "@share/lib"
import { Button } from "@share/ui/Buttons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@share/ui/Command"
import { ScrollArea, ScrollBar } from "@share/ui/Layout"
import { Popover, PopoverContent, PopoverTrigger } from "@share/ui/Popover"
import { Typography } from "@share/ui/Text"
import { useState, type FC, type HTMLAttributes } from "react"
import { FlagImage, ParsedCountry, defaultCountries, parseCountry } from "react-international-phone"

const customCountries = defaultCountries.map((country) => {
	const parsedCountry = parseCountry(country)

	const customFormats: Partial<Record<typeof parsedCountry.iso2, typeof parsedCountry.format>> = {
		ru: "+7 (...) ...-..-..",
	}

	return Object.assign(parsedCountry, {
		format: customFormats[parsedCountry.iso2] || parsedCountry.format,
	})
})

interface FlagImagePreviewProps extends HTMLAttributes<HTMLButtonElement> {
	iso2: string
	onChangeCountry: (value: string) => void
}

export const FlagImagePreview: FC<FlagImagePreviewProps> = ({ iso2, onChangeCountry, ...props }) => {
	const [country, setCountry] = useState("")

	return (
		<Popover onOpenChange={(open) => open && setCountry("")}>
			<PopoverTrigger asChild>
				<Button
					{...props}
					variant='ghost'
					role='combobox'
					className={cn("absolute px-2", props.className)}
				>
					<FlagImage
						className='h-8'
						iso2={iso2}
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				side='right'
				sideOffset={0}
				className='w-max p-1'
			>
				<Command
					className='space-y-2'
					value={iso2}
				>
					<CommandInput
						placeholder='Search country...'
						onInput={(e) => setCountry(e.currentTarget.value)}
					/>
					<CommandEmpty>No country found.</CommandEmpty>
					<ScrollArea className='h-[300px] whitespace-nowrap'>
						<CommandGroup>
							{customCountries
								.filter((c) => c.name.toLocaleLowerCase().includes(country.toLocaleLowerCase()))
								.map((country) => (
									<CommandItem
										key={country.iso2}
										value={country.iso2}
										onSelect={() => onChangeCountry(country.iso2)}
										className={cn(
											"flex gap-2 transition-colors duration-300 hover:bg-slate-300",
											country.iso2 === iso2 && "bg-accent",
										)}
									>
										<FlagImage
											iso2={country.iso2}
											className='h-8'
										/>
										<Typography variant='content2'>{country.name}</Typography>
									</CommandItem>
								))}
						</CommandGroup>
						<ScrollBar orientation='vertical' />
					</ScrollArea>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
