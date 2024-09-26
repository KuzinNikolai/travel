"use client";

import { useNoReload } from "@share/packages/reactHelpers";
import { type FC, type ReactNode, useEffect } from "react";
import {
	RegistrationSteps,
	useRegistrationStepsStore,
} from "../model/hooks/useRegistrationSteps";
import { FirstInfo } from "./Steps/FirstInfo";
import { VerifyCode } from "./Steps/VerifyCode";

interface RegistrationFormProps {
	onFinish?: () => void;
}

export const RegistrationForm: FC<RegistrationFormProps> = ({ onFinish }) => {
	const { currentStep } = useRegistrationStepsStore();
	const listenReload = useNoReload();

	useEffect(() => {
		listenReload(true);
	}, [listenReload]);

	const steps = {
		[RegistrationSteps.FirstInfo]: <FirstInfo />,
		[RegistrationSteps.Verify]: onFinish && <VerifyCode onFinish={onFinish} />,
	} satisfies { [key in RegistrationSteps]: ReactNode };

	return steps[currentStep as keyof typeof steps];
};
