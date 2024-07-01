"use client"

import type { LoginRequest } from "@packages/schemes/auth/login/client.schema"
import type { RegistrationRequest } from "@packages/schemes/auth/registration/server.schema"
import type { VerificationRequest } from "@packages/schemes/auth/verify/client.schema"
import { SafeJson } from "@packages/utils/SafeJson"

export const clientRegistration = (data: RegistrationRequest) =>
	fetch("/externalApi/auth/registration", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: SafeJson.stringify(data),
	})

export const clientVerify = (data: VerificationRequest) =>
	fetch("/externalApi/auth/verify", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: SafeJson.stringify(data),
	})

export const clientLogin = (data: LoginRequest) =>
	fetch("/externalApi/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: SafeJson.stringify(data),
	})

export const clientLogout = (token: string) =>
	fetch("/externalApi/auth/logout", {
		method: "POST",
		headers: { Authorization: `Token ${token}` },
	})
