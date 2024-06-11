"use client";

import { Icon } from "@/components/Icon";
import { FullScreenModal } from "@/components/Modals/FullScreenModal";
import { Typography } from "@/components/Typography";
import { Suspense } from "react";
import { SearchInput } from "./components/SearchInput";
import { SearchList } from "./components/SearchList";

const SearchTrigger = (
  <button className="w-full max-w-[140px] p-2 bg-gray-200 rounded-xl flex items-center justify-around gap-1">
    <Icon name="Search" />
    <Typography variant="span">Найти тур</Typography>
  </button>
);

export const SearchMenu = () => {
  return (
    <FullScreenModal trigger={SearchTrigger} className="bg-background">
      <header className="w-full py-2 pr-1">
        <FullScreenModal.CloseTrigger className="flex flex-row text-secondary [&>svg]:stroke-secondary p-1">
          <Icon name="ChevronLeft" /> Back
        </FullScreenModal.CloseTrigger>
      </header>

      <div className="w-full h-[300px] p-2 flex flex-col gap-4">
        <Suspense>
          <SearchInput />
        </Suspense>
        <Suspense>
          <SearchList />
        </Suspense>
      </div>
    </FullScreenModal>
  );
};
