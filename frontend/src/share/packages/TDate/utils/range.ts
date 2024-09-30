export const getRangeDays = (dateBegin: Date | string, dateEnd: Date | string) => {
	const _dateBegin = new Date(dateBegin)
	const _dateEnd = new Date(dateEnd)

	const time = _dateBegin.getTime() - _dateEnd.getTime()

	return {
		days: time / (1000 * 60 * 60 * 24),
		month: time / (1000 * 60 * 60 * 24 * 30),
		year: time / (1000 * 60 * 60 * 24 * 30 * 12),
	}
}
