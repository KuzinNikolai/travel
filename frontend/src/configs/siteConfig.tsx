import { Metadata } from "next";
import { Icon } from "@components/Icon";
import { INavigation } from "@/entities/navigation";

interface SiteConfig extends Metadata {
  name: string;
  navigation: INavigation[];
}

export const siteConfig = {
  name: "trevel",
  description: "The best travel agency",

  navigation: [
    {
      name: "Мои заказы",
      href: "/orders",
      description: "Заказы за всё время",
      icon: <Icon name="Wallet" className="w-6 h-6 stroke-primary-400" />,
    },
    {
      name: "Wishlist",
      href: "/wishlist",
      description: "lorem ipsum",
      icon: <Icon name="Star" className="w-6 h-6 stroke-primary-400" />,
    },
  ],
} satisfies SiteConfig;
