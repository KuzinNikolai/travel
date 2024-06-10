export interface IPagesProps<T extends Record<string, string> = Record<string, string>> {
  params: {
    slugs: string[];
  } & T;
  searchParams: Record<string, string | string[] | undefined>;
}
