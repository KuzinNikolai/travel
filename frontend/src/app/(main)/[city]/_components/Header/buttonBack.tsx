"use client";

import { Button } from "@/components/Button";
import { FC } from "react";

const onBack = () => window.history.back();

export const ButtonBack: FC = () => {
  return (
    <Button
      className="-translate-x-3 text-secondary transition delay-100 hover:text-cyan-500"
      leftIcon="ChevronLeft"
      onClick={onBack}
    >
      Back
    </Button>
  );
};
