import { clamp } from "@/packages/utils/pxTo";

type Classes = Record<string, string>;

const textClamp = (clamp: string) => `text-[${clamp}]`;

export const variants = {
  h1: ["h1", "text-h1"],
  h2: ["h2", "text-h2"],
  h3: ["h3", "text-h3"],
  h4: ["h4", "text-h4"],
  h5: ["h5", "text-h5"],
  content1: ["p", "text-content1"],
  content2: ["p", "text-content2"],
  span: ["span", "text-span"],
  small: ["small", "text-small"],

  link: ["span", "text-link"],
  button: ["button", "text-button"],
} satisfies Record<
  string,
  [tag: keyof HTMLElementTagNameMap | undefined, classes: string]
>;

export const weight = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
} satisfies Classes;

export const style = {
  italic: "italic",
  notItalic: "not-italic",
} satisfies Classes;

export const align = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
  start: "text-start",
  end: "text-end",
} satisfies Classes;

export const transform = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
  normal: "normal-case",
} satisfies Classes;
