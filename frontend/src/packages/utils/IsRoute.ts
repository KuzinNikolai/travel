"use client";

import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

interface IIsRouteProps {
  is: RegExp | string;
  children: ReactNode;
}

export const IsRoute: FC<IIsRouteProps> = ({ is, children }) => {
  const pathname = usePathname();
  const isCoincide = is instanceof RegExp ? is.test(pathname) : is.includes(pathname);
  return isCoincide ? children : null;
};
