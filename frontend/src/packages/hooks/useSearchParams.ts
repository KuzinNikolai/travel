import { useSearchParams as nextUseSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export const useSearchParams = <SearchParams extends string = string>() => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = nextUseSearchParams();

  const createQueryString = useCallback(
    (name: SearchParams, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const getParam = useCallback((key: SearchParams) => searchParams.get(key), [searchParams]);

  const setParam = useCallback(
    (key: SearchParams, value: string) => {
      router.push(`/?${createQueryString(key, value)}`, { scroll: false });
    },
    [searchParams],
  );

  const hasParam = useCallback((key: SearchParams) => searchParams.has(key), [searchParams]);

  const deleteParam = useCallback(
    (key: SearchParams, force = false) => {
      router.push(force ? pathname : `${pathname}?${createQueryString(key, "")}`, { scroll: false });
    },
    [searchParams],
  );

  const clearParams = useCallback(() => router.push(pathname), []);

  return {
    getSearchParam: getParam,
    setSearchParam: setParam,
    hasSearchParam: hasParam,
    deleteSearchParam: deleteParam,
    clearSearchParams: clearParams,
    searchParams,
  };
};
