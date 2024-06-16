import { cn } from "@/packages/tw-utils";
import style from "./Tour.module.css";
import { Skeleton } from "@/components/Skeleton";
import { Rating } from "@components/share/Rating";

export const TourSkeleton = () => (
  <div
    className={cn(
      "grid grid-cols-[137px_1fr] gap-4 w-full",
      style["under-line"]
    )}
  >
    <Skeleton className="h-full" />
    <div className="flex-1 flex flex-col gap-3">
      <div className="flex flex-row flex-wrap justify-between gap-x-2">
        <Skeleton className="w-28 h-4" />
        <Skeleton className="w-12 h-4" />
      </div>
      <div className="flex flex-col gap-1">
      <Skeleton className="w-full h-[1.25rem]" />
      <Skeleton className="w-full h-[1.25rem]" />
      </div>
      <div className="flex flex-row justify-between gap-4">
        <Rating.Skeleton />
        <Skeleton className="w-full h-5 flex-1 text-primary-400 line-clamp-4" />
      </div>
    </div>
  </div>
);
