type Classes = Record<string, string>;

export const variants = {
  h1: ["h1", "text-2xl leading-5"],
  h2: ["h2", "text-2xl leading-5"],
  h3: ["h3", "text-1xl leading-5"],
  h4: ["h4", "text-xl leading-5"],
  h5: ["h5", "text-lg leading-5"],
  paragraph: ["p", "text-base leading-5"],
  span: ["span", "text-base leading-5"],
  label: ["label", "text-base/8 leading-5"],
  small: ["span", "text-sm leading-5"],
  button: "text-base leading-5",
  link: "text-base leading-5 underline",
} satisfies Record<
  string,
  string | [tag: keyof HTMLElementTagNameMap | JSX.Element, classes: string]
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
