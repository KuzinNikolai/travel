import { cn } from "@/packages/tw-utils";
import { Typography, TypographyVariants } from "@components/Typography";
import { FC, HTMLAttributes, ReactElement } from "react";
import { Container } from "./Container";
import { Paper } from "./Paper";

interface IBoxProps extends HTMLAttributes<HTMLElement> {
  title: string;
  titleType?: TypographyVariants;
  hiddenTitle?: boolean;
  header?: ReactElement | null;
  containerClassNames?: string;
}

export const Section: FC<IBoxProps> = ({
  className,
  header,
  title,
  titleType = "h2",
  hiddenTitle = false,
  children,
  containerClassNames,
  ...props
}) => {
  return (
    <Paper
      variant="main"
      as="section"
      {...props}
      className={cn("py-3", className)}
    >
      <Container
        className={cn(
          "flex flex-col",
          !hiddenTitle || header ? "gap-4" : "",
          containerClassNames
        )}
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
