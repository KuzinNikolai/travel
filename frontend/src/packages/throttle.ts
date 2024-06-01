export const createThrottle = <T extends any[]>(cb: (...args: T) => void, delay: number) => {
  let pause = false;

  const throttleEffect = (...arr: T) => {
    if (pause) {
      return;
    }

    pause = true;
    
    setTimeout(() => {
      cb(...arr);
      pause = false;
    }, delay);
  }

  return throttleEffect
}