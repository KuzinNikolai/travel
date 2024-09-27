"use client"

import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import * as React from "react"

import { cn } from "@share/packages/tailwindHelpers"
import { Button } from "../Buttons"
import { Typography } from "../Text"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
	opts?: CarouselOptions
	plugins?: CarouselPlugin
	orientation?: "horizontal" | "vertical"
	setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0]
	api: ReturnType<typeof useEmblaCarousel>[1]
	canScrollPrev: boolean
	canScrollNext: boolean
	scrollPrev: () => void
	scrollNext: () => void
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
	const context = React.useContext(CarouselContext)

	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel />")
	}

	return context
}

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
	({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
		const [carouselRef, api] = useEmblaCarousel(
			{
				...opts,
				axis: orientation === "horizontal" ? "x" : "y",
			},
			plugins,
		)

		const [canScrollPrev, setCanScrollPrev] = React.useState(false)
		const [canScrollNext, setCanScrollNext] = React.useState(false)

		const onSelect = React.useCallback((api: CarouselApi) => {
			if (!api) {
				return
			}

			setCanScrollPrev(api.canScrollPrev())
			setCanScrollNext(api.canScrollNext())
		}, [])

		const scrollPrev = React.useCallback(() => {
			api?.scrollPrev()
		}, [api])

		const scrollNext = React.useCallback(() => {
			api?.scrollNext()
		}, [api])

		const handleKeyDown = React.useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				if (event.key === "ArrowLeft") {
					event.preventDefault()
					scrollPrev()
				} else if (event.key === "ArrowRight") {
					event.preventDefault()
					scrollNext()
				}
			},
			[scrollPrev, scrollNext],
		)

		React.useEffect(() => {
			if (!api || !setApi) {
				return
			}

			setApi(api)
		}, [api, setApi])

		React.useEffect(() => {
			if (!api) {
				return
			}

			onSelect(api)
			api.on("reInit", onSelect)
			api.on("select", onSelect)

			return () => {
				api?.off("select", onSelect)
			}
		}, [api, onSelect])

		return (
			<CarouselContext.Provider
				value={{
					carouselRef,
					api: api,
					opts,
					orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
					canScrollPrev,
					canScrollNext,
					scrollPrev,
					scrollNext,
				}}
			>
				<div
					ref={ref}
					onKeyDownCapture={handleKeyDown}
					className={cn("relative", className)}
					role='region'
					aria-roledescription='carousel'
					{...props}
				>
					{children}
				</div>
			</CarouselContext.Provider>
		)
	},
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const { carouselRef, orientation } = useCarousel()

		return (
			<div
				ref={carouselRef}
				className='overflow-hidden'
			>
				<div
					ref={ref}
					className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
					{...props}
				/>
			</div>
		)
	},
)
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const { orientation } = useCarousel()

		return (
			<div
				ref={ref}
				role='group'
				aria-roledescription='slide'
				className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-2" : "pt-2", className)}
				{...props}
			/>
		)
	},
)
CarouselItem.displayName = "CarouselItem"

const CarouselDots = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ children, ...props }, ref) => {
		const { api } = useCarousel()

		return (
			<div
				className='-translate-x-2/4 absolute bottom-2 left-2/4 z-10 flex items-center justify-center gap-4'
				ref={ref}
				{...props}
			>
				{(api?.slideNodes() || []).map((_, index) => (
					<Button
						variant='ghost'
						size='sm'
						key={index}
						className={cn("h-2 w-2", index === api?.selectedScrollSnap() ? "bg-white" : "bg-gray-200")}
					>
						{children}
					</Button>
				))}
			</div>
		)
	},
)
CarouselDots.displayName = "CarouselDots"

const CarouselLengthViewer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ children, ...props }, ref) => {
		const { api } = useCarousel()
		const [selectedItem, setSelectedItem] = React.useState(0)

		const onSelect = React.useCallback(
			(api: CarouselApi) => {
				if (!api) {
					return
				}

				setSelectedItem(api.selectedScrollSnap())
			},
			[api],
		)

		React.useEffect(() => {
			api?.on("select", onSelect)

			return () => {
				api?.off("select", onSelect)
			}
		})

		return (
			<div
				className='absolute right-2 bottom-2 z-10 flex items-center justify-center gap-1 rounded bg-black/40 p-2 text-white backdrop:blur-3xl'
				ref={ref}
				{...props}
			>
				<Typography>{selectedItem + 1}</Typography>
				<Typography>/</Typography>
				<Typography>{api?.scrollSnapList().length || 0}</Typography>
			</div>
		)
	},
)
CarouselLengthViewer.displayName = "CarouselLengthViewer"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
	({ className, variant = "outline", size = "md", ...props }, ref) => {
		const { orientation, scrollPrev, canScrollPrev } = useCarousel()

		return (
			<Button
				ref={ref}
				variant={variant}
				size={size}
				className={cn(
					"absolute h-8 w-8 rounded-full",
					orientation === "horizontal"
						? "-left-12 -translate-y-1/2 top-1/2"
						: "-top-12 -translate-x-1/2 left-1/2 rotate-90",
					className,
				)}
				disabled={!canScrollPrev}
				onClick={scrollPrev}
				{...props}
			>
				<ArrowLeft className='h-4 w-4' />
				<span className='sr-only'>Previous slide</span>
			</Button>
		)
	},
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
	({ className, variant = "outline", size = "md", ...props }, ref) => {
		const { orientation, scrollNext, canScrollNext } = useCarousel()

		return (
			<Button
				ref={ref}
				variant={variant}
				size={size}
				className={cn(
					"absolute h-8 w-8 rounded-full",
					orientation === "horizontal"
						? "-right-12 -translate-y-1/2 top-1/2"
						: "-bottom-12 -translate-x-1/2 left-1/2 rotate-90",
					className,
				)}
				disabled={!canScrollNext}
				onClick={scrollNext}
				{...props}
			>
				<ArrowRight className='h-4 w-4' />
				<span className='sr-only'>Next slide</span>
			</Button>
		)
	},
)
CarouselNext.displayName = "CarouselNext"

export {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselLengthViewer,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
}
