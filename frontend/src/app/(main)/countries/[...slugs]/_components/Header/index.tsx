import { Typography } from "@/components/Typography";
import { Header as UiHeader } from "@components/Header";
import { FC } from "react";
import { ButtonBack } from "./buttonBack";

interface IHeaderProps {
  title: string;
}

export const Header: FC<IHeaderProps> = ({ title: title }) => {
  return (
    <UiHeader
      leftColumn={<ButtonBack />}
      centerColumn={
        <Typography variant="paragraph" width="bold" as="h1">
          {title}
        </Typography>
      }
    />
  );
};
