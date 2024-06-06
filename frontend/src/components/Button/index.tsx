"use client";

import clsx from "clsx";
import { FC, HTMLAttributes } from "react";
import { Icon, IconsName } from "../Icon";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "normal" | "small";
  leftIcon?: IconsName;
  rightIcon?: IconsName;
  color?: string;
  hoverColor?: string;
}

export const Button: FC<IButtonProps> = ({
  variant,
  size,
  leftIcon,
  rightIcon,
  color,
  hoverColor,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "py-2 px-3 flex items-center",
        props.className,
        color && `text-[${color}] [&>svg]:stroke-[${color}]`,
        hoverColor &&
          `hover:text-[${hoverColor}] hover:[&>svg]:stroke-[${hoverColor}]`
      )}
    >
      {leftIcon && <Icon name={leftIcon} />}
      {props?.children}
      {rightIcon && <Icon name={rightIcon} />}
    </button>
  );
};
