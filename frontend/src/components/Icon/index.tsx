import clsx from "clsx";
import { icons } from "lucide-react";
import { FC, HTMLAttributes } from "react";

interface IconProps extends HTMLAttributes<SVGSVGElement> {
  name: keyof typeof icons;
}

export const Icon: FC<IconProps> = ({ name, className, ...props }) => {
  const NewIcon = icons[name];
  return (
    <NewIcon
      {...props}
      className={clsx("w-6 h-6 stroke-1", className)}
    />
  );
};
