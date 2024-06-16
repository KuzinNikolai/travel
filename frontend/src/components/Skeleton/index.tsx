import clsx from "clsx";
import { FC } from "react";

interface ICustomSkeletonProps {
  isBackgroundBlack?: boolean;
  className?: string;
}

export const CustomSkeleton: FC<ICustomSkeletonProps> = ({
  isBackgroundBlack = false,
  className,
}) => {
  return (
    <div
      className={clsx(
        `bg-gradient-to-r`,
        isBackgroundBlack
          ? "from-gray-400 to-gray-300"
          : "from-gray-400/20 to-gray-400/20",
        `duration-[2s] animate-pulse rounded`,
        className
      )}
    />
  );
};

export const Skeleton = CustomSkeleton;
