import { FC } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";

interface IRatingProps {
  rating: number;
}

export const Rating: FC<IRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      <label className="sr-only">{rating}</label>

      {new Array(5).fill(0).map((_, index) => (
        <Star
          key={index}
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
