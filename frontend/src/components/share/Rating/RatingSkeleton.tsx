import { Skeleton } from "@components/Skeleton";

export const RatingSkeleton = () => {
  return (
    <div className="flex flex-row gap-1">
      {new Array(5).fill(0).map((_, index) => (
        <Skeleton key={index} className="w-5 h-5" />
      ))}
    </div>
  );
};
