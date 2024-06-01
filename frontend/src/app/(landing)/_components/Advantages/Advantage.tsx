import { Box } from "@/components/Box";
import { Typography } from "@/components/Typography";
import { IAdvantage } from "@/entities/advatage";
import { FC } from "react";

export interface IAdvantageProps {
  advantage: IAdvantage;
}

export const Advantage: FC<IAdvantageProps> = ({ advantage }) => {
  return (
    <Box as="li" className="min-w-[194px] p-3 bg-background rounded-lg flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <label className="hidden" form="time">
          {advantage.iconLabel}
        </label>
        <div className="flex items-center justify-center w-[46px] h-[46px] [&>svg]:w-[44px] [&>svg]:h-[44px] [&>svg]:stroke-1">
          {advantage.icon}
        </div>
        <Typography
          variant="h3"
          as="h3"
          width="semibold"
          className="content-center text-lg hyphens-manual leading-6 "
        >
          {advantage.title}
        </Typography>
      </div>
      <Typography
        variant="paragraph"
        width="light"
        className="text-primary-400 leading-5"
      >
        {advantage.description}
      </Typography>
    </Box>
  );
};
