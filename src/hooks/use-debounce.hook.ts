import { useEffect, useState } from "react";

export const useDebounce = <T>(val: T, time: number = 200) => {
  const [debouncedValue, setDebouncedValue] = useState(val);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(val);
    }, time);
    return () => clearTimeout(timeout);
  }, [time, val]);

  return debouncedValue;
};
