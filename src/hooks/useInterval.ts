import { useEffect, useRef } from "react";

export default function useInterval(callback: () => void, delay: number) {
  const callbackRef = useRef<typeof callback>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => callbackRef.current();
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
