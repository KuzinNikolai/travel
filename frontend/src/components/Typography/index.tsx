import clsx from "clsx";
import { HTMLAttributes, PropsWithChildren, createElement } from "react";
import { align, style, transform, variants, weight } from "./typography";

interface ITypographyProps<Element>
  extends PropsWithChildren<HTMLAttributes<HTMLElement & Element>> {
  variant: keyof typeof variants;
  width?: keyof typeof weight;
  textStyle?: keyof typeof style;
  align?: keyof typeof align;
  transform?: keyof typeof transform;
  bold?: boolean;
  as?: keyof HTMLElementTagNameMap;
}

export const Typography = <Tag,>({
  as,
  variant,
  ...props
}: ITypographyProps<Tag>) => {
  return createElement(
    as || variants[variant][0] || "p",
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
      ),
    },
    props.children
  );
};

export type TypographyVariants = keyof typeof variants;
