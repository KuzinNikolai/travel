import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";
import { ISearchGroup } from "@/entities/search.entity";
import { useSearchParams } from "@/packages/hooks/useSearchParams";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { SearchItem } from "../SearchItem";

export const SearchList = () => {
  const { getSearchParam, setSearchParam, searchParams } =
    useSearchParams<"q">();
  const [searchGroups, setSearchGroups] = useState<ISearchGroup[]>([]);

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

    get();
  }, [searchParams]);

  return searchGroups.length > 1 ? (
    <ul className="list-none flex flex-col gap-2">
      {searchGroups.map((group) => (
        <li key={group.id}>
          <ul
            className={clsx(
              "flex flex-col gap-2",
              "[&:not(:last-child)]:after:border-black/20 [&:not(:last-child)]:after:border-t-[1px] [&:not(:last-child)]:after:content-['']"
            )}
          >
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
