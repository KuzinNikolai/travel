const BASE_PX = 16

export class ViewportMath {
	#basePx = BASE_PX

	constructor(basePx = BASE_PX) {
		this.#basePx = basePx
	}

	pxToRem(px: number, basePx = this.#basePx) {
		return px / basePx
	}

	clamp(minPx: number, view: number | string, maxPx: number) {
		const viewSize = typeof view === "string" ? view : `${view}vw`
		return `clamp(${this.pxToRem(minPx)}rem,${viewSize},${this.pxToRem(maxPx)}rem)`
	}

	static pxToEm(px: number, basePx = BASE_PX) {
		const viewportMath = new ViewportMath(basePx)
		return viewportMath.pxToRem(px)
	}

	static clamp(minPx: number, view: number | string, maxPx: number, basePx = BASE_PX) {
		const viewportMath = new ViewportMath(basePx)
		return viewportMath.clamp(minPx, view, maxPx)
	}
}
