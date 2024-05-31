type Classes = Record<string, string>;

export const variants = {
  h1: ["h1", "text-2xl font-semibold"],
  h2: ["h2", "text-2xl font-semibold"],
  h3: ["h3", "text-1xl font-semibold"],
  h4: ["h4", "text-xl font-semibold"],
  h5: ["h5", "text-lg font-semibold"],
  paragraph: ["p", "text-base font-medium"],
  span: ["span", "text-base font-medium"],
  label: ["label", "text-base/8 font-medium"],
  small: ["span", "text-sm font-medium"],
  button: "text-base font-light uppercase",
  link: "text-base font-medium underline",
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
