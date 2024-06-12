import { Typography } from "@/components/Typography";
import { forwardRef } from "react";
import { Header } from "../Base";
import { ButtonBack } from "./buttonBack";

interface IBackHeaderProps {
  title?: string;
  onBack?: () => void;
}

export const BackHeader = forwardRef<HTMLElement, IBackHeaderProps>(
  ({ title, onBack }) => {
    return (
      <Header
        leftColumn={<ButtonBack onClick={onBack} />}
        centerColumn={
          <Typography variant="content1" width="bold" align="center" as="h1">
            {title}
          </Typography>
        }
      />
    );
  }
);
