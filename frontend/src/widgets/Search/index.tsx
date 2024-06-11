"use client";

import { Icon } from "@/components/Icon";
import { FullScreenModal } from "@/components/Modals/FullScreenModal";
import { Typography } from "@/components/Typography";
import { ISearchGroup } from "@/entities/search.entity";
import { useSearchParams } from "@/packages/hooks/useSearchParams";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { SearchItem } from "./components/searchItem";

const SearchTrigger = (
  <button className="w-full max-w-[140px] p-2 bg-gray-200 rounded-xl flex items-center justify-around gap-1">
    <Icon name="Search" />
    <Typography variant="span">Найти тур</Typography>
  </button>
);

export const SearchMenu = () => {
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

  return (
    <FullScreenModal trigger={SearchTrigger} className="bg-background">
      <header className="w-full py-2 pr-1">
        <FullScreenModal.CloseTrigger className="flex flex-row text-secondary [&>svg]:stroke-secondary p-1">
          <Icon name="ChevronLeft" /> Back
        </FullScreenModal.CloseTrigger>
      </header>

      <div className="w-full h-[300px] p-2 flex flex-col gap-4">
        <input
          type="text"
          name="Search"
          onBlur={(e) => setSearchParam("q", e.currentTarget.value)}
        />
        {searchGroups.length > 1 ? (
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
                    <SearchItem {...item} />
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
        )}
      </div>
    </FullScreenModal>
  );
};
