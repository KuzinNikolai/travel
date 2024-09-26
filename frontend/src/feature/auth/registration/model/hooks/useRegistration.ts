"use client";

import { __DEV__ } from "@share/constants/environment";
import { useServerActionMutation } from "@share/packages/serverActions";
import { useToast } from "@share/ui/Popups";
import { registrationAction } from "../serverActions/registrationAction";
import { useLoginDataStore } from "./useLoginData";

export function useRegistration() {
	const { toast } = useToast();
	const { setData } = useLoginDataStore();

	const mutation = useServerActionMutation(registrationAction, {
		onSuccess: (_, { email, password }) => {
			setData({ email, password });

			if (__DEV__) {
				toast({ title: "Успешно", description: "Успешная регистрация!" });
			}
		},
		onError: (err) => {
			switch (err.code) {
				case "CONFLICT": {
					toast({
						title: "Ошибка",
						description:
							"Пользователь с такой почтой уже зарегистрирован. Попробуйте другой адрес или воспользуйтесь функцией восстановления пароля",
					});
					break;
				}
				default:
					toast({
						title: "Ошибка",
						description:
							"Произошла ошибка при регистрации, позже попробуйте ещё раз",
					});
			}
		},
	});

	return mutation;
}
