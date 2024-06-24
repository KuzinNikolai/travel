import { logger } from "./logger";

export class SafeJson {
  static parse(data: string): unknown | undefined {
    try {
      return JSON.parse(data);
    } catch (e) {
      logger.warn("Parse error", e);
    }
  }

  static stringify(data: unknown, replace?: never, space?: number): string | undefined {
    try {
      return JSON.stringify(data, replace, space);
    } catch (e) {
      logger.warn("Stringify error", e);
    }
  }
}
