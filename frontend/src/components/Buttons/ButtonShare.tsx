"use client";

import { MouseEventHandler, forwardRef } from "react";
import { IconButton, type IconButtonProps } from "./IconButton";

interface IButtonProps extends Partial<IconButtonProps> {
  shareData: ShareData;
  asChild?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
}

const ShareButton = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ shareData, onSuccess, onError, onClick: cbOnClick, ...props }, ref) => {
    const onClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
      try {
        if (navigator["share"]) {
          navigator.share(shareData);
        } else {
          const shareDataStr = `${shareData.title + " | "}${shareData.text + " | "}${shareData.url}`;
          navigator.clipboard.writeText(shareDataStr);
        }
      } catch (error) {
        if (error instanceof DOMException) {
          console.error(error);
        }
      }

      cbOnClick?.(e);
    };

    return <IconButton {...props} onClick={onClick} icon="Share" ref={ref} />;
  }
);

ShareButton.displayName = "ShareButton";

export { ShareButton, type IButtonProps };
