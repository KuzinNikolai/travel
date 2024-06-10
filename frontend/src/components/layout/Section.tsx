import clsx from "clsx";
import { FC, HTMLAttributes, ReactElement } from "react";
import { Typography, TypographyVariants } from "@components/Typography";
import { Paper } from "./Paper";
import { Container } from "./Container";

interface IBoxProps extends HTMLAttributes<HTMLElement> {
  title: string;
  titleType?: TypographyVariants;
  hiddenTitle?: boolean;
  header?: ReactElement | null;
}

export const Section: FC<IBoxProps> = ({
  className,
  header: header,
  title,
  titleType = "h2",
  hiddenTitle = false,
  children,
  ...props
}) => {
  return (
    <Paper variant="main" as="section" {...props} className="py-3">
      <Container
        className={clsx("flex flex-col", !hiddenTitle || header ? "gap-4" : "")}
      >
        <div className="flex items-center justify-between">
          <Typography
            variant={titleType}
            className={hiddenTitle ? "sr-only" : undefined}
          >
            {title}
          </Typography>
          {header}
        </div>
        {children}
      </Container>
    </Paper>
  );
};
