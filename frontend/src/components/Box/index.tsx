import { cn } from "@/packages/tw-utils";
import clsx from "clsx";
import { FC, HTMLAttributes, PropsWithChildren, createElement } from "react";

interface IBoxProps extends HTMLAttributes<HTMLElement> {
  as?: keyof HTMLElementTagNameMap;
}

export const Box: FC<PropsWithChildren<IBoxProps>> = ({
  as = "div",
  children,
  ...props
}) => {
  return createElement(
    as,
    { ...props, className: clsx("bg-background-400", props.tw, props.className) },
    children
  );
};
