export const createDebounce = <T extends any[]>(cb: (...args: T) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;

  const debounceEffect = (...arr: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => cb(...arr), delay);
  }

  return debounceEffect
}