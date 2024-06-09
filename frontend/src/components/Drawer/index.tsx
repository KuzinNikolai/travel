"use client";

import { FC, PropsWithChildren, ReactElement } from "react";
import {
  DrawerHeader,
  DrawerTitle,
  Drawer as UIDrawer,
  DrawerContent as UIDrawerContent,
  DrawerTrigger as UIDrawerTrigger,
} from "../@ui/drawer";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Box } from "../Box";

interface IDrawerProps extends PropsWithChildren {
  title: string;
  expand?: boolean;
  trigger?: ReactElement;
}

export const Drawer: FC<IDrawerProps> = ({
  title,
  expand,
  trigger,
  children,
}) => {
  return (
    <UIDrawer open={expand}>
      {trigger && <UIDrawerTrigger asChild>{trigger}</UIDrawerTrigger>}
      <UIDrawerContent className="container">
        <div className="pb-4">
          <div className="py-2 pt-4">
            <Typography variant="h2" width="medium" className="w-full">
              {title}
            </Typography>
          </div>
          <div className="max-h-[80vh] overflow-y-auto ">{children}</div>
        </div>
      </UIDrawerContent>
    </UIDrawer>
  );
};
