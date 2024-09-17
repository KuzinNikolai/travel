"use client"

import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"

export default function ErrorBoundary({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {

	return (
		<Section className='flex-1' containerClassNames="flex flex-col space-y-md">
			<Typography
				variant='h5'
				as='h2'
			>
				Something went wrong!
			</Typography>
			<Typography className="space-y-sm">
				<Typography as='span'>We working on the problem right away.</Typography>
				<Typography as='span'>Please try again later.</Typography>
			</Typography>
			{/* <Button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</Button> */}
		</Section>
	)
}
