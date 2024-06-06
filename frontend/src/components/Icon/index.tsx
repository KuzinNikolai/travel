import clsx from "clsx";
import { icons as lucideIconsPack } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { customIconsPack } from "./CustomIcons";

export type IconsName = keyof (typeof lucideIconsPack & typeof customIconsPack);

interface IconProps extends HTMLAttributes<SVGSVGElement> {
  name?: IconsName;
}

export const Icon: FC<IconProps> = ({ name, className, ...props }) => {
  const NewIcon =
    lucideIconsPack[name as keyof typeof lucideIconsPack] ||
    customIconsPack[name as keyof typeof customIconsPack] ||
    lucideIconsPack["Asterisk"];

  return <NewIcon {...props} className={clsx("w-6 h-6 stroke-1", className)} />;
};
