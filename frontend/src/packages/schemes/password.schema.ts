import { z } from "zod";

export const specialSymbols = "!@#$%^&*";

export const passwordScheme = z
  .string()
  .regex(/(?=.*[a-zA-Z])/g, "Должна быть хотя бы 1 латинская буква!")
  .regex(/(?=.*[0-9])/g, "Должна быть хотя бы 1 цифра!")
  .regex(new RegExp(`(?=.*[${specialSymbols}])`, "g"), `Пароль должен содержать хотя бы 1 символ: ${specialSymbols}`)
  .regex(
    new RegExp(`^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]*$`, "g"),
    "В пароле содержаться недопустимые символы",
  )
  .min(6, "пароль не должен быть меньше 6 символов");
