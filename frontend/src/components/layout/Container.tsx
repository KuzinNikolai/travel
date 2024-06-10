import clsx from "clsx";
import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { DefaultSize } from "./types";

interface IContainerProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  fixed?: boolean;
  maxWidth?: DefaultSize;
  minWidth?: DefaultSize;
}

export const Container: FC<IContainerProps> = ({
  maxWidth,
  minWidth,
  fixed = true,
  className,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(
        className,
        fixed && "container",
        maxWidth &&
          (typeof maxWidth === "number"
            ? `max-w-${maxWidth}`
            : `max-w-[${maxWidth}]`),
        minWidth &&
          (typeof minWidth === "number"
            ? `min-w-${minWidth}`
            : `min-w-[${minWidth}]`)
      )}
    >
      {children}
    </div>
  );
};
