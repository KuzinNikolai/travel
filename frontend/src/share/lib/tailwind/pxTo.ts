export function pxToEm(defaultRemInPx: number) {
	return (px: number) => px / defaultRemInPx
}

export const pxToRem = pxToEm(16)

export function clamp(minPx: number, view: number | string, maxPx: number) {
	const viewSize = typeof view === "string" ? view : `${view}vw`
	return `clamp(${pxToRem(minPx)}rem,${viewSize},${pxToRem(maxPx)}rem)`
}
