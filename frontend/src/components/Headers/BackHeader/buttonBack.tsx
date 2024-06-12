"use client";

import { Button } from "@/components/Button";
import { FC, HTMLAttributes } from "react";

const historyBack = () => history.back();

export const ButtonBack: FC<HTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <Button
      className="-translate-x-3 text-secondary transition delay-100 hover:text-cyan-500"
      leftIcon="ChevronLeft"
      {...props}
      onClick={props.onClick || historyBack}
    >
      Назад
    </Button>
  );
};
