import { Calendar, type CalendarProps } from "@share/ui/Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@share/ui/Popover"
import type { FC, ReactElement } from "react"
import type { SelectMultipleEventHandler, SelectRangeEventHandler, SelectSingleEventHandler } from "react-day-picker"

interface IDatePickerProps {
	defaultSelect?: Date
	trigger?: ReactElement
	onSelect?: SelectSingleEventHandler | SelectMultipleEventHandler | SelectRangeEventHandler
	disable?: (date: Date) => boolean
}

export const DatePicker: FC<IDatePickerProps & CalendarProps> = ({
	defaultSelect,
	onSelect,
	disable,
	trigger,
	...props
}) => {
	return (
		<Popover>
			<PopoverTrigger asChild>{trigger}</PopoverTrigger>
			<PopoverContent
				className='w-auto p-0'
				align='start'
			>
				<Calendar
					mode='single'
					initialFocus
					{...props}
					selected={defaultSelect}
					// @ts-expect-error
					onSelect={onSelect}
					disabled={disable}
					classNames={{
						root: "bg-base-180",
						day_today: "bg-base-170",
						day_selected: "bg-transparent",
					}}
				/>
			</PopoverContent>
		</Popover>
	)
}