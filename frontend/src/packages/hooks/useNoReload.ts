"use client";

import { useEffect } from "react";

/**
 * A hook that prevents the page from reloading when the `listen` parameter is set to `true`.
 *
 * @param listen - listen or not
 */
export const useNoReload = (listen: boolean = false, customMessage?: string) => {
  useEffect(() => {
    if (!listen) return;

    const onBeforeReload: WindowEventHandlers["onbeforeunload"] = (ev) => {
      ev.preventDefault();
      ev.returnValue = "You have unsaved changes. Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", onBeforeReload);
    return () => window.removeEventListener("beforeunload", onBeforeReload);
  }, [listen]);
};
