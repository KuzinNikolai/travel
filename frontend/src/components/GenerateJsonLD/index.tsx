export type JsonLDScheme = {
	[key: string]: unknown
	"@type": string
}

interface IJsonLDProps<Schema extends JsonLDScheme> {
	schema: Schema
	toHead?: boolean
}

export const JsonLD = <Schema extends JsonLDScheme>({ schema, toHead = true }: IJsonLDProps<Schema>) => {
	return toHead ? (
		<head>
			<script
				type='application/ld+json'
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
			/>
		</head>
	) : (
		<script
			type='application/ld+json'
			// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	)
}
