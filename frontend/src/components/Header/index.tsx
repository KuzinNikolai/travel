import clsx from "clsx";
import { FC } from "react";

interface IHeaderProps {
  leftColumn?: React.ReactNode;
  centerColumn?: React.ReactNode;
  rightColumn?: React.ReactNode;
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
        "relative",
        "z-10 sticky top-0 left-0 right-0",
        props.backgroundColor || "bg-white/70",
        "backdrop-blur-3xl"
      )}
    >
      <div
        className={clsx("container py-2", "flex justify-between items-center")}
      >
        {leftColumn}
        {centerColumn && (
          <div
            className={clsx(
              "absolute left-1/2 -translate-x-1/2",
              "flex-1 flex items-center justify-center"
            )}
          >
            {centerColumn}
          </div>
        )}
        {rightColumn}
      </div>
    </header>
  );
};
