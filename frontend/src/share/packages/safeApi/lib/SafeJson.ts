import { print } from "@share/packages/logger"
import { safe } from "../safe"

export class SafeJson {
	static parse(data: string): Record<string, unknown> | undefined {
		const { success, data: successData, error } = safe(() => JSON.parse(data))

		if (!success) {
			print.error("[SafeJson - error]", error)
		}

		return successData
	}

	static stringify(data: unknown, replace?: never, space?: number): string | undefined {
		const { success, data: successData, error } = safe(() => JSON.stringify(data, replace, space))

		if (!success) {
			print.error("[SafeJson - error]", error)
		}

		return successData
	}

	static isStringify(data: unknown): boolean {
		return !!SafeJson.stringify(data)
	}

	static isParsable(data: string): boolean {
		return !!SafeJson.parse(data)
	}
}
