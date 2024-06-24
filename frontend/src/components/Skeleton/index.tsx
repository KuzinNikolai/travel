import clsx from "clsx";
import { FC, HTMLAttributes, forwardRef } from "react";

interface ICustomSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  isBackgroundBlack?: boolean;
  className?: string;
}

export const Skeleton: FC<ICustomSkeletonProps> = forwardRef<HTMLDivElement, ICustomSkeletonProps>(
  ({ isBackgroundBlack = false, className, ...props }, ref) => {
    return (
      <div
        className={clsx(
          `bg-gradient-to-r`,
          isBackgroundBlack ? "from-gray-400 to-gray-300" : "from-gray-400/20 to-gray-400/20",
          `duration-[2s] animate-pulse rounded`,
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
