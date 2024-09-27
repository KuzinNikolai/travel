import { z } from "zod"

export const specialSymbols = "!@#$%^&*`~"

export const passwordScheme = z
	.string()
	.regex(/(?=.*[a-zA-Z])/g, {
		message: "Должна быть хотя бы 1 латинская буква!",
	})
	.regex(/(?=.*[0-9])/g, { message: "Должна быть хотя бы 1 цифра!" })
	.regex(new RegExp(`(?=.*[${specialSymbols}])`, "g"), {
		message: `Пароль должен содержать хотя бы 1 символ: ${specialSymbols}`,
	})
	.regex(new RegExp(`^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[${specialSymbols}])[a-zA-Z0-9${specialSymbols}]`, "g"), {
		message: "В пароле содержаться недопустимые символы",
	})
	.min(6, { message: "пароль не должен быть меньше 6 символов" })
