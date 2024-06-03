import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";
import { ISearchItem } from "@/entities/search";
import Link from "next/link";
import { FC } from "react";

export const SearchItem: FC<ISearchItem> = ({ link, title }) => {
  return (
    <li>
      <Link
        href={link}
        className="flex items-center gap-2 hover:text-accent hover:[&_svg]:stroke-accent"
      >
        <Icon name="SignpostBig" />
        <Typography variant="paragraph" as="p">
          {title}
        </Typography>
      </Link>
    </li>
  );
};
