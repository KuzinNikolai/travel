export function toNumber(val: string): number {
	return Number.parseInt(val) || Number.NaN
}
