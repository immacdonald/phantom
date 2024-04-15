import { useEffect, useRef } from "react";
import { Callback } from "../types";

const useInterval = (callback: Callback<void>, delay: number | null) => {
  const savedCallback = useRef<Callback<void> | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current != null) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export { useInterval }