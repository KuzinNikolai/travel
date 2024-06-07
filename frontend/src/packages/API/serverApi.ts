import { z } from "zod";
import { API_DOMAIN } from "./constants";

export type fetchMethods = NonNullable<Parameters<typeof fetch>[1]>;

const globalMethods = {
  cache: "default",
  next: { revalidate: 6 },
} satisfies fetchMethods;

export const fetchApi = async <T = unknown>(
  url: string,
  method: "POST" | "GET" | "PUT" | "DEL",
  options?: Omit<RequestInit, "method"> & { schema?: z.ZodType<T> }
): Promise<T | undefined> => {
  let _url = url.trim().replace(/^\//, "");

  try {
    const data = await fetch(`${API_DOMAIN?.trim()}/api/v1/${_url}`, {
      method,
      ...(options || {}),
      ...globalMethods,
    });

    if (!data.ok) {
      console.error(data);
      return;
    }

    const json = await data.json();

    if (options?.schema?.parse(json)) {
      return json;
    }

    return json;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    }

    return;
  }
};
