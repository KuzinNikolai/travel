"use client";

import { print } from "@share/packages/logger";
import { Button } from "@share/ui/Buttons";
import { Section } from "@share/ui/Layout";
import { Typography } from "@share/ui/Text";

interface RootErrorBoundaryProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorBoundary({
	error,
	reset,
}: RootErrorBoundaryProps) {
	const onReset = () => {
		reset();
	};

	print.error(error);

	return (
		<Section className="flex-1" containerClassNames="flex flex-col space-y-md">
			<Typography variant="h5" as="h2">
				Something went wrong!
			</Typography>
			<Typography className="space-y-sm">
				<Typography as="span">We working on the problem right away.</Typography>
				<Typography as="span">Please try again later.</Typography>
			</Typography>
			<Button onClick={onReset}>Try again</Button>
		</Section>
	);
}
