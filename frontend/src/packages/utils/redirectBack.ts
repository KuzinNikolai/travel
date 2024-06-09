import { consola } from "consola";
import { RedirectType, redirect } from "next/navigation";

export const createRedirectBack = (baseUrl: string) => {
  var url = baseUrl;

  if (baseUrl[0] !== "/") {
    url = "/" + url;
  }

  if (baseUrl.at(-1) !== "/") {
    url += "/";
  }

  return (...currentSteps: (string | undefined | null)[]) => {
    var steps = currentSteps.filter((step) => !!step) as string[]
    steps.pop();
    consola.debug(`Redirect to step: ${steps}`);
    redirect(url + steps.join('/'), RedirectType.replace);
  };
};
