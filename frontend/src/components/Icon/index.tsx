import { icons as lucideIconsPack } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { customIconsPack } from "./CustomIcons";

type IconsName = keyof (typeof lucideIconsPack & typeof customIconsPack);

interface IconProps extends HTMLAttributes<SVGSVGElement> {
  name?: IconsName;
}

const Icon: FC<IconProps> = ({ name, ...props }) => {
  const NewIcon =
    lucideIconsPack[name as keyof typeof lucideIconsPack] ||
    customIconsPack[name as keyof typeof customIconsPack] ||
    lucideIconsPack["Asterisk"];

  return <NewIcon {...props} />;
};

export { Icon, type IconProps, type IconsName };
