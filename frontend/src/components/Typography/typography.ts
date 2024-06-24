import { cva, VariantProps } from "class-variance-authority";

export const typographyVariants = cva(null, {
  defaultVariants: {
    variant: "content1",
  },
  variants: {
    variant: {
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
      content1: "text-content1",
      content2: "text-content2",
      span: "text-span",
      small: "text-small",
      link: "text-link",
      button: "text-button",
    },
    textWidth: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    textStyle: {
      italic: "italic",
      notItalic: "not-italic",
    },
    textTransform: {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
      normal: "normal-case",
    },
    textAlign: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
      start: "text-start",
      end: "text-end",
    },
  },
});

export type TypographyVariantsProps = VariantProps<typeof typographyVariants>;

export const tags = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  content1: "p",
  content2: "p",
  span: "span",
  small: "small",
  link: "a",
  button: "button",
} satisfies Record<Exclude<TypographyVariantsProps["variant"], null | undefined>, keyof HTMLElementTagNameMap>;
