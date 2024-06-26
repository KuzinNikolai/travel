"use client";

import { useMultistepForm } from "@/packages/hooks/useMultistepForm";
import { AdditionalInfo } from "./components/AdditionalInfo";
import { FirstInfo } from "./components/FirstInfo";
import { VerifyCode } from "./components/VerifyCode";
import { useNoReload } from "@/packages/hooks/useNoReload";
import { useEffect } from "react";

export const RegistrationForm = () => {
  const { currentStep, backStep, nextStep, goToStep } = useMultistepForm({ maxSteps: 2 });

  const listenReload = useNoReload();

  useEffect(() => {
    listenReload(true);
  }, []);

  const steps = {
    0: <FirstInfo next={nextStep} />,
    1: <AdditionalInfo next={nextStep} back={backStep} />,
    2: <VerifyCode goToStep={goToStep} />,
  };

  return <>{steps[currentStep as keyof typeof steps]}</>;
};
