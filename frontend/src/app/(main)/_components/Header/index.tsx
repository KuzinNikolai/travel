"use client";

import { BurgerMenu } from "@/widgets/BurgerMenu";
import { SearchMenu } from "@/widgets/Search";
import { Header as UiHeader } from "@components/Header";

export const Header = () => {
  return (
    <UiHeader
      leftColumn={<BurgerMenu />}
      rightColumn={<SearchMenu />}
      backgroundColor="bg-gray-100/70"
    />
  );
};
