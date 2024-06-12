import { Skeleton } from "@/components/Skeleton";

export const SearchItemLoading = () => {
  return (
    <li aria-label="Загрузка" className="flex items-center gap-2">
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-[60vw] h-4" />
    </li>
  );
};
