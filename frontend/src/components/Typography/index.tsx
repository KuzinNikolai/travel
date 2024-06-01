import { FC, HTMLAttributes, PropsWithChildren, createElement } from "react";
import { align, style, transform, variants, weight } from "./typography";
import clsx from "clsx";

interface ITypographyProps extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  variant: keyof typeof variants;
  width?: keyof typeof weight;
  textStyle?: keyof typeof style;
  align?: keyof typeof align;
  transform?: keyof typeof transform;
  bold?: boolean;
  as?: keyof HTMLElementTagNameMap;
}

export const Typography: FC<ITypographyProps> = ({
  as,
  variant,
  ...props
}) => {
  return createElement(
    variants[variant][0] || as || "p",
    { 
      ...props, 
      className: clsx(
        variants[variant][1],
        props.textStyle && style[props.textStyle],
        props.align && align[props.align],
        props.transform && transform[props.transform],
        props.bold && "font-bold",
        props.width && weight[props.width],
        props.className
      ) 
    },
    props.children
  );
};
