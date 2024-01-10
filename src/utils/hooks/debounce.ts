import { useEffect, useState } from 'react';

export const useDebounced = (initialValue: string) => {
  const [debouncedValue, setDebouncedValue] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(initialValue);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [initialValue]);
  return debouncedValue;
};
