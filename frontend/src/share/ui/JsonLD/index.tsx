import Script from "next/script"

export type JsonLDScheme = {
	[key: string]: unknown
	"@context": string
	"@type": string
}

interface IJsonLDProps<Schema extends JsonLDScheme> {
	schema: Schema
}

export const JsonLD = <Schema extends JsonLDScheme>({ schema }: IJsonLDProps<Schema>) => {
	return (
		<Script
			id='json-ld'
			type='application/ld+json'
			// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	)
}
