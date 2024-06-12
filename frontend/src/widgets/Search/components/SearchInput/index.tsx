"use client";

import { Input } from "@/components/@ui/input";
import { createDebounce } from "@/packages/debounce";
import { useSearchParams } from "@/packages/hooks/useSearchParams";

const debounce = createDebounce(
  (query: string, setParam: (key: "q", value: string) => void) =>
    setParam("q", query),
  200
);

export const SearchInput = () => {
  const { setSearchParam } = useSearchParams<"q">();

  return (
    <Input
      type="text"
      name="Search"
      placeholder="Поиск"
      onInput={(e) => debounce(e.currentTarget.value, setSearchParam)}
    />
  );
};
