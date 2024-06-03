"use client";

import { Separator } from "@/components/@ui/separator";
import { Icon } from "@/components/Icon";
import { FullScreenModal } from "@/components/Modals/FullScreenModal";
import { SearchItem } from "./components/searcItem";
import { ISearchGroup } from "@/entities/search";
import clsx from "clsx";

const SearchElements = [
  {
    items: [
      {
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        link: "/",
      },
    ],
  },
  {
    items: [
      {
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        link: "/",
      },
      {
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        link: "/",
      },
      {
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        link: "/",
      },
    ],
  },
] satisfies ISearchGroup[];

// TODO: Add normal layout and styles for search
export const SearchMenu = () => {
  return (
    <FullScreenModal
      trigger={<Icon name="Search" />}
      className="bg-background slide-in-from-right-0 -right-[100%] animate-in delay-100"
    >
      <header className="w-full py-2 pr-1">
        <FullScreenModal.CloseTrigger className="flex flex-row text-secondary [&>svg]:stroke-secondary p-1">
          <Icon name="ChevronLeft" /> Back
        </FullScreenModal.CloseTrigger>
      </header>

      <div className="w-full h-[300px] p-2">
        input search
        <ul className="list-none flex flex-col gap-2">
          {SearchElements.map((group, index) => (
            <ul
              key={index}
              className={clsx(
                "flex flex-col gap-2",
                "[&:not(:last-child)]:after:border-black/20 [&:not(:last-child)]:after:border-t-[1px] [&:not(:last-child)]:after:content-['']"
              )}
            >
              <li>
                <ul>
                  {group.items.map((searchItem, index) => (
                    <SearchItem
                      key={index}
                      title={searchItem.title}
                      link={searchItem.link}
                    />
                  ))}
                </ul>
              </li>
            </ul>
          ))}
        </ul>
      </div>
    </FullScreenModal>
  );
};
