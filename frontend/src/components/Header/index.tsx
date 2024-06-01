"use client";

import { createUniqChecker } from "@/packages/uniqChecker";
import { Menu, Search } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

const setUniqTop = createUniqChecker(
  (isTop: boolean, setColor: Dispatch<SetStateAction<boolean>>) =>
    setColor(isTop)
);

export const Header = () => {
  const [isTop, setTop] = useState<boolean>(false);

  const iconColor = useMemo(
    () => (isTop ? "stroke-primary" : "stroke-primary-400"),
    [isTop]
  );

  useEffect(() => {
    const cb: EventListener = (e) => {
      setUniqTop(window.scrollY > 60, setTop);
    };

    window.addEventListener("scroll", cb);
    return () => window.removeEventListener("scroll", cb);
  }, []);

  return (
    <header className="sticky top-0 left-0 right-0 container py-2 flex justify-between backdrop-blur-lg z-10">
      <button>
        <Menu
          className={`w-6 h-6 ${iconColor} hover:stroke-accent transition-[all_0.4ms]`}
        />
      </button>
      <button>
        <Search
          className={`w-6 h-6 ${iconColor} hover:stroke-accent transition-[all_0.4ms]`}
        />
      </button>
    </header>
  );
};
