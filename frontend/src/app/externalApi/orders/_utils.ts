import type * as POST_Schema from './_schema/POST'

export function isRequiredFieldsError(
	data: POST_Schema.CreateOrderServerResponse,
): data is POST_Schema.RequiredFieldsErrorResponseByKey {
	const requiredFieldEmpty: POST_Schema.RequiredFieldKeys[] = []

	for (const [_, value] of Object.entries(data).entries()) {
		Array.isArray(value[1]) && requiredFieldEmpty.push(value[0] as POST_Schema.RequiredFieldKeys)
	}

	return requiredFieldEmpty.length > 0
}