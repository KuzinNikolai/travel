import { Skeleton } from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { siteConfig } from "@/configs/siteConfig";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { NavigationItem } from "./NavigationItem";

export const BurgerSheet = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-[40px_1fr] items-center gap-2">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/300" className="h-10 w-10 rounded-full object-cover object-center" />
          <AvatarFallback>
            <Skeleton className="h-10 w-10 rounded-full" />
          </AvatarFallback>
        </Avatar>
        <Typography variant="span" as="p" textWidth="light" className="truncate">
          123123123123123123123112312312312312312312123
        </Typography>
      </div>
      <nav>
        <ul className="flex flex-col gap-3 overflow-y-auto">
          {siteConfig.navigation.map((item, index) => (
            <NavigationItem key={index + `${item.href}`} navigation={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
};
