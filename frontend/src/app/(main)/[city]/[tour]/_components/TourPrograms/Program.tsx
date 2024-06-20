import { Box } from "@/components/layout/Box";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { IProgram } from "@/packages/schemes/travel/program.schema";
import clsx from "clsx";
import { FC } from "react";

interface IProgramProps {
  program: IProgram;
  currency: string;
}

export const Program: FC<IProgramProps> = ({ program, currency }) => {
  return (
    <Box className={clsx("flex flex-col gap-3 p-3 py-4", "border-l-2 border-l-gray-500/60 bg-background")} as="li">
      <Typography variant="h3" as="h3" className="text-xl" width="medium">
        {program.title}
      </Typography>
      <ul className="flex flex-col">
        <li key="price-adult" className="flex gap-1">
          <Typography variant="span">
            Взрослый:{" "}
            <Typography variant="span">
              {currency} {program.adult_price}
            </Typography>
          </Typography>
        </li>
        <li key="price-child" className="flex gap-1">
          <Typography variant="span">
            Ребенок:{" "}
            <Typography variant="span">
              {currency} {program.child_price}
            </Typography>
          </Typography>
        </li>
      </ul>
      <div className="flex gap-1">
        <Button
          className={clsx(
            "w-full flex-1 justify-center rounded text-center",
            "bg-accent text-white hover:bg-transparent hover:text-accent",
            "text-xl",
          )}
        >
          order
        </Button>
        <Button
          className={clsx(
            "w-full flex-1 justify-center rounded text-center",
            "border border-accent text-accent hover:bg-accent hover:text-accent hover:text-white",
            "text-xl",
          )}
        >
          Подробнее
        </Button>
      </div>
    </Box>
  );
};
