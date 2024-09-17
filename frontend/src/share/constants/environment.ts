export const __DEV__ = process.env.NODE_ENV === "development"
export const __PROD__ = process.env.NODE_ENV === "production"

export const __BROWSER__ = typeof window !== "undefined"
export const __SERVER__ = !__BROWSER__