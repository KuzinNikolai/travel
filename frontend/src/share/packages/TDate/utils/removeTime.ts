type TDate = Date | string

export const removeYears = (date: TDate, years: number): Date => {
	const _date = new Date(date)
	_date.setFullYear(_date.getFullYear() - years)
	return _date
}

export const removeMonths = (date: TDate, months: number): Date => {
	const _date = new Date(date)
	_date.setMonth(_date.getMonth() - months)
	return _date
}

export const removeDays = (date: TDate, days: number): Date => {
	const _date = new Date(date)
	_date.setDate(_date.getDate() - days)
	return _date
}

export const removeHours = (date: TDate, hours: number): Date => {
	const _date = new Date(date)
	_date.setHours(_date.getHours() - hours)
	return _date
}

export const removeMinutes = (date: TDate, minutes: number): Date => {
	const _date = new Date(date)
	_date.setMinutes(_date.getMinutes() - minutes)
	return _date
}

export const removeSeconds = (date: TDate, seconds: number): Date => {
	const _date = new Date(date)
	_date.setSeconds(_date.getSeconds() - seconds)
	return _date
}
