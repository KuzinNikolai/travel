import { SafeJson } from "@/packages/utils/SafeJson"
import type { LoginRequest } from "@packages/schemes/auth/login/client.schema"
import type { RegistrationRequest } from "@packages/schemes/auth/registration/server.schema"
import type { VerificationServerRequest } from "@packages/schemes/auth/verify/server.schema"
import { API_DOMAIN } from "../../constants"

export const serverRegistration = (reqData: RegistrationRequest) =>
	fetch(`${API_DOMAIN}/api/v1/register/`, {
		headers: { "Content-Type": "application/json" },
		method: "POST",
		body: SafeJson.stringify(reqData),
	})

export const serverVerify = (reqData: VerificationServerRequest) =>
	fetch(`${API_DOMAIN}/api/v1/verify-email/`, {
		headers: { "Content-Type": "application/json" },
		method: "POST",
		body: SafeJson.stringify(reqData),
	})

export const serverLogin = (reqData: LoginRequest) =>
	fetch(`${API_DOMAIN}/api/v1/auth/token/login/`, {
		headers: { "Content-Type": "application/json" },
		method: "POST",
		body: SafeJson.stringify(reqData),
	})

export const serverLogout = (token: string) =>
	fetch(`${API_DOMAIN}/api/v1/auth/token/logout/`, {
		method: "POST",
		headers: { Authorization: token },
	})
