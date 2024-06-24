import { Typography } from "@/components/Typography";
import { forwardRef } from "react";
import { Header } from "../Base";
import { ButtonBack } from "./buttonBack";

interface IBackHeaderProps {
  title?: string;
  onBack?: () => void;
}

export const BackHeader = forwardRef<HTMLElement, IBackHeaderProps>(({ title, onBack }, ref) => {
  return (
    <Header
      ref={ref}
      leftColumn={<ButtonBack onClick={onBack} />}
      centerColumn={
        <Typography variant="content1" textWidth="bold" textAlign="center" as="h1">
          {title}
        </Typography>
      }
    />
  );
});

BackHeader.displayName = "Header with back button";
