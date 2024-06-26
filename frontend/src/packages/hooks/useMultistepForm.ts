import { useCallback, useState } from "react";

interface IUseStepsArgs {
  initialStep?: number;
  maxSteps?: number;
}

const maxStep = (step: number, max: number) => Math.min(step, max);

export const useMultistepForm = ({ initialStep = 0, maxSteps = Infinity }: IUseStepsArgs) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToStep = useCallback((step: number) => setCurrentStep(step), []);
  const nextStep = useCallback(() => setCurrentStep((val) => maxStep(++val, maxSteps)), [maxSteps]);
  const backStep = useCallback(() => setCurrentStep((val) => Math.max(--val, 0)), []);

  return {
    currentStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === maxSteps,
    goToStep,
    nextStep,
    backStep,
  };
};
