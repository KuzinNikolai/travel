import { Typography } from "@/components/Typography";
import { INavigation } from "@/entities/navigation";
import Link from "next/link";
import { FC } from "react";

interface INavigationItemProps {
  navigation: INavigation;
}

export const NavigationItem: FC<INavigationItemProps> = ({ navigation }) => {
  return (
    <Link href={navigation.href} className="grid grid-cols-[24px_1fr] items-center gap-2 border-b-[1px] pb-2 border-b-primary-400">
      {navigation.icon}
      <div className="flex flex-col gap-1">
        <Typography variant="span" as="p" width="semibold" className="truncate">
          {navigation.name}
        </Typography>
        <Typography variant="span" as="p" width="light" className="truncate">
          {navigation.description}
        </Typography>
      </div>
    </Link>
  );
};