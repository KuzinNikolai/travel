import { FC, ReactElement } from "react";
import {
  SelectMultipleEventHandler,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from "react-day-picker";
import { Calendar, CalendarProps } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface IDatePickerProps {
  defaultSelect?: Date;
  trigger?: ReactElement;
  onSelect?:
    | SelectSingleEventHandler
    | SelectMultipleEventHandler
    | SelectRangeEventHandler;
  disable?: (date: Date) => boolean;
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
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          initialFocus
          {...props}
          selected={defaultSelect}
          // @ts-expect-error
          onSelect={onSelect}
          disabled={disable}
          classNames={{
            root: 'bg-background-400',
            day_today: "bg-gray-200",
            day_selected: 'bg-transparent'
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
