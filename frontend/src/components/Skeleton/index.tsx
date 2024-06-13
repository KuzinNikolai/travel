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
          ? "from-white/90 to-red-80"
          : "from-white/40 to-white/50",
        `duration-[2s] animate-pulse`,
        className
      )}
    />
  );
};

export const Skeleton = CustomSkeleton;
