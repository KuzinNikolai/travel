"use client";

import { Dialog, DialogTrigger, DialogClose } from "@/components/@ui/dialog";
import { Portal } from "@/components/Portal";
import { DialogContent } from "@radix-ui/react-dialog";
import clsx from "clsx";
import { FC, PropsWithChildren, useEffect } from "react";

interface IFullScreenModalSubComponents {
  CloseTrigger: typeof DialogClose;
}

interface IFullScreenModalProps extends PropsWithChildren {
  trigger?: React.ReactNode;
  expand?: boolean;
  className?: string;
}

const onOpenChange = (open: boolean) => {
  if (open) {
    document.body.style.pointerEvents = "none";
    document.body.style.overflow = "hidden";
  } else {
    document.body.removeAttribute("style");
  }
};

export const FullScreenModal: FC<IFullScreenModalProps> &
  IFullScreenModalSubComponents = ({
  expand,
  trigger,
  className,
  children,
}) => {
  return (
    <Dialog open={expand} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <Portal>
        <DialogContent
          className={clsx("fixed top-0 left-0 w-full h-full z-50", className)}
        >
          {children}
        </DialogContent>
      </Portal>
    </Dialog>
  );
};

FullScreenModal.CloseTrigger = DialogClose;