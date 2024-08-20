export const isBrowserEnv = () => typeof window !== "undefined";
export const isServerEnv = () => !isBrowserEnv();
