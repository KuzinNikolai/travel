import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";
import { ISearchGroup } from "@/entities/search.entity";
import { useSearchParams } from "@/packages/hooks/useSearchParams";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { SearchItem } from "../SearchItem";
import { SearchItemLoading } from "../SearchItemLoading";

export const SearchList = () => {
  const { getSearchParam, searchParams } = useSearchParams<"q">();
  const [searchGroups, setSearchGroups] = useState<ISearchGroup[] | null>(null);

  useEffect(() => {
    var get = async () => {
      var query = getSearchParam("q");
      var searchGroups = await fetch(
        query ? `/externalApi/search?q=${query}` : "/externalApi/search"
      );

      if (!searchGroups.ok) {
        return;
      }

      setSearchGroups(
        query
          ? await searchGroups.json()
          : ((await searchGroups.json()) as ISearchGroup[]).map(
              (searchGroup) => ({
                id: searchGroup.id,
                items: searchGroup.items.filter((item) => !item.tourSlug),
              })
            )
      );
    };

    setSearchGroups(null);
    get();
  }, [searchParams]);

  if (searchGroups == null) {
    return (
      <ul className="list-none flex flex-col gap-2">
        {Array.from({ length: 10 }, (_, index) => (
          <SearchItemLoading key={index} />
        ))}
      </ul>
    );
  }

  return searchGroups.length > 0 ? (
    <ul className="list-none flex flex-col gap-2">
      {searchGroups.map((group) => (
        <li
          key={group.id}
          className={
            getSearchParam("q")
              ? "[&:not(:last-child)]:after:mt-2 [&:not(:last-child)]:after:block [&]:after:bg-black/20 [&]:after:h-[1px] [&]:after:w-full [&:not(:last-child)]:after:content-['']"
              : ""
          }
        >
          <ul className={"flex flex-col gap-2"}>
            {group.items.map((item) => (
              <SearchItem key={item.title} {...item} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  ) : (
    <div className="flex gap-2">
      <Icon name="LocateOff" />
      <Typography variant="h3" as="p">
        Ничего не найдено
      </Typography>
    </div>
  );
};
