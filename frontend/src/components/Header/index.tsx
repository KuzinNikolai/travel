"use client";

import { BurgerMenu } from "@/widgets/BurgerMenu";
import { SearchMenu } from "@/widgets/Search";

export const Header = () => {
  return (
    <header className={`sticky top-0 left-0 right-0 container py-2 flex justify-between items-center bg-white/70 backdrop-blur-3xl z-10`}>
      <BurgerMenu />
      <SearchMenu />
    </header>
  );
};
