import clsx from "clsx";
import { FC, ReactNode } from "react";
import { Container } from "../layout/Container";

interface IHeaderProps {
  leftColumn?: ReactNode | ReactNode[];
  centerColumn?: ReactNode | ReactNode[];
  rightColumn?: ReactNode | ReactNode[];
  backgroundColor?: string;
}

export const Header: FC<IHeaderProps> = ({
  leftColumn,
  centerColumn,
  rightColumn,
  ...props
}) => {
  return (
    <header
      className={clsx(
        "z-10 sticky top-0 left-0 right-0",
        props.backgroundColor || "bg-white/70",
        "backdrop-blur-3xl"
      )}
    >
      <Container
        className={clsx("py-2", "flex justify-between items-center gap-2")}
      >
        <div
          className={clsx("flex-1", "flex items-center justify-start gap-2")}
        >
          {leftColumn}
        </div>
        <div
          className={clsx("flex-1", "flex items-center justify-center gap-2")}
        >
          {centerColumn}
        </div>
        <div className={clsx("flex-1", "flex items-center justify-end gap-2")}>
          {rightColumn}
        </div>
      </Container>
    </header>
  );
};
