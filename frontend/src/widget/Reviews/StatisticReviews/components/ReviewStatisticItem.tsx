import { Icon } from "@share/ui/Icon";
import { Typography } from "@share/ui/Text";
import type { FC } from "react";

interface ReviewStatisticItemProps {
	number: number;
	totalCount: number;
	count: number;
}

export const ReviewStatisticItem: FC<ReviewStatisticItemProps> = ({
	count,
	number,
	totalCount,
}) => {
	return (
		<li className="flex items-center gap-sm">
			<Typography className="text-base-20">{number}</Typography>
			<Icon name="Star" className="h-9 w-9 fill-primary-80 stroke-none" />
			<div className="relative h-2 w-full flex-1 bg-base-140">
				<div
					className="absolute h-full bg-primary-80"
					style={{ width: (count / totalCount) * 100 }}
				/>
			</div>
			<Typography className="text-base-0">{count}</Typography>
		</li>
	);
};
