import { Typography } from "@share/ui/Text";
import type { FC } from "react";

interface HowWeAreWorkingProps {
	label: string;
	description: string;
}

export const HowWeAreWorking: FC<HowWeAreWorkingProps> = ({
	label,
	description,
}) => (
	<li className="flex flex-col gap-sm">
		<Typography variant="h7" as="h3" className="text-primary-70">
			{label}
		</Typography>
		<Typography className="text-base-20">{description}</Typography>
	</li>
);
