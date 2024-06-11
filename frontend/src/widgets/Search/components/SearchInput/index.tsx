import { useSearchParams } from "@/packages/hooks/useSearchParams";

export const SearchInput = () => {
  const { setSearchParam } = useSearchParams<"q">();

  return (
    <input
      type="text"
      name="Search"
      onBlur={(e) => setSearchParam("q", e.currentTarget.value)}
    />
  );
};
