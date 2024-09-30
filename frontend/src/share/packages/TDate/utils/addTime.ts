type TDate = Date | string

export const addYears = (date: TDate, years: number): Date => {
	const _date = new Date(date)
	_date.setFullYear(_date.getFullYear() + years)
	return _date
}

export const addMonths = (date: TDate, months: number): Date => {
	const _date = new Date(date)
	_date.setMonth(_date.getMonth() + months)
	return _date
}

export const addDays = (date: TDate, days: number): Date => {
	const _date = new Date(date)
	_date.setDate(_date.getDate() + days)
	return _date
}

export const addHours = (date: TDate, hours: number): Date => {
	const _date = new Date(date)
	_date.setHours(_date.getHours() + hours)
	return _date
}

export const addMinutes = (date: TDate, minutes: number): Date => {
	const _date = new Date(date)
	_date.setMinutes(_date.getMinutes() + minutes)
	return _date
}

export const addSeconds = (date: TDate, seconds: number): Date => {
	const _date = new Date(date)
	_date.setSeconds(_date.getSeconds() + seconds)
	return _date
}
