import { FC } from "react";
import clsx from "clsx";
import { Icon } from "../Icon";

interface IRatingProps {
  rating: number;
}

export const Rating: FC<IRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      <label className="sr-only">{rating}</label>

      {new Array(5).fill(0).map((_, index) => (
        <Icon
          key={index}
          name="Star"
          aria-hidden
          className={clsx(
            "w-5 h-5 stroke-[2px] stroke-star",
            index < Math.round(rating) ? "fill-star" : "fill-none"
          )}
        />
      ))}
    </div>
  );
};
