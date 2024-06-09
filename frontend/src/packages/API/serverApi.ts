import { z } from "zod";
import { API_DOMAIN } from "./constants";
import { consola } from "consola";

export type fetchMethods = NonNullable<Parameters<typeof fetch>[1]>;

const globalMethods = {
  next: { revalidate: 6 },
} satisfies fetchMethods;

export const fetchApi = async <T = unknown>(
  url: string,
  method: "POST" | "GET" | "PUT" | "DEL",
  options?: Omit<RequestInit, "method"> & { schema?: z.ZodType<T> }
): Promise<T | undefined> => {
  let _url = url.trim().replace(/^\//, "");

  try {
    consola.log("Fetch data by url", `${API_DOMAIN?.trim()}/api/v1/${_url}`)

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

    const parsedData = options?.schema?.safeParse(json);

    if (parsedData?.error) {
      // console.error(parsedData.error)
      consola.warn(`URL: ${url}`, "Data:", JSON.stringify(json, undefined, 2));
      consola.error(
        parsedData.error.name,
        parsedData.error.message,
        JSON.stringify(parsedData, undefined, 2)
      );
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
