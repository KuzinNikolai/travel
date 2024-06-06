"use client";

import clsx from "clsx";
import NextLink from "next/link";
import { FC, HTMLAttributes } from "react";

interface IButtonProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "primary" | "secondary";
  size?: "normal" | "small";
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}

export const Link: FC<IButtonProps> = ({
  variant,
  size,
  leftIcon,
  rightIcon,
  children,
  ...props
}) => {
  return (
    <NextLink
      {...props}
      className={clsx("py-2 px-3 flex items-center", props.className)}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </NextLink>
  );
};
