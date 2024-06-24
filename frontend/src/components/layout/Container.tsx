import clsx from "clsx";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

interface IContainerProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  fixed?: boolean;
}

export const Container: FC<IContainerProps> = ({ fixed = true, className, children, ...props }) => {
  return (
    <div {...props} className={clsx(className, fixed && "container")}>
      {children}
    </div>
  );
};
