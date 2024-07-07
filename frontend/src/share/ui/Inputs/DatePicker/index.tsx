import { Calendar, Popover, PopoverContent, PopoverTrigger, type CalendarProps } from "@share/ui"
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
						root: "bg-background-400",
						day_today: "bg-gray-200",
						day_selected: "bg-transparent",
					}}
				/>
			</PopoverContent>
		</Popover>
	)
}
