"use client";

import { useMultistepForm } from "@/packages/hooks/useMultistepForm";
import { AdditionalInfo } from "./steps/AdditionalInfo";
import { FirstInfo } from "./steps/FirstInfo";
import { VerifyCode } from "./steps/VerifyCode";
import { useNoReload } from "@/packages/hooks/useNoReload";
import { useEffect } from "react";

export const RegistrationForm = () => {
  const { currentStep, backStep, nextStep, goToStep } = useMultistepForm({ maxSteps: 2 });

  const listenReload = useNoReload();

  useEffect(() => {
    listenReload(true);
  }, []);

  const steps = {
    0: <FirstInfo next={nextStep} goToStep={goToStep} />,
    1: <AdditionalInfo next={nextStep} back={backStep} />,
    2: <VerifyCode goToStep={goToStep} />,
  };

  return <>{steps[currentStep as keyof typeof steps]}</>;
};
