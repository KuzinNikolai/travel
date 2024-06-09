export type JsonLDScheme = {
  [key: string]: any;
  "@type": string;
};

interface IJsonLDProps<Schema extends JsonLDScheme> {
  schema: Schema;
  toHead?: boolean;
}

export const JsonLD = <Schema extends JsonLDScheme>({
  schema,
  toHead = true,
}: IJsonLDProps<Schema>) => {
  return toHead ? (
    <head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </head>
  ) : (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
