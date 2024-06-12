import { Box } from "@/components/layout/Box";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { IProgram } from "@/entities/travel/program.entity";
import clsx from "clsx";
import { FC } from "react";

interface IProgramProps {
  program: IProgram;
  currency: string;
}

export const Program: FC<IProgramProps> = ({ program, currency }) => {
  return (
    <Box
      className={clsx(
        "flex flex-col gap-3 p-3 py-4",
        "bg-background border-l-2 border-l-gray-500/60"
      )}
      as="li"
    >
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
            "flex-1 text-center w-full justify-center rounded",
            "bg-accent text-white hover:text-accent hover:bg-transparent",
            "text-xl"
          )}
        >
          order
        </Button>
        <Button
          className={clsx(
            "flex-1 text-center w-full justify-center rounded",
            "text-accent hover:text-accent border-accent border hover:text-white hover:bg-accent",
            "text-xl"
          )}
        >
          Подробнее
        </Button>
      </div>
    </Box>
  );
};
