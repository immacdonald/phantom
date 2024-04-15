import { useEffect } from "react";
import { Callback } from "../types";

const useBackButton = (callback: Callback<void>) => {
  const handleEvent = () => {
    callback();
  };

  useEffect(() => {
    window.addEventListener("popstate", handleEvent);
    return () => window.removeEventListener("popstate", handleEvent);
  });

  return true;
};

export default useBackButton;