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
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const openChange = (open: boolean) => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};

export const FullScreenModal: FC<IFullScreenModalProps> &
  IFullScreenModalSubComponents = ({
  expand,
  trigger,
  className,
  onOpenChange,
  children,
}) => {
  return (
    <Dialog
      open={expand}
      onOpenChange={(expand) => (openChange(expand), onOpenChange?.(expand))}
    >
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
