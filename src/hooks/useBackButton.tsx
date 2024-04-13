import { useEffect } from "react";

const useBackButton = (callback: any) => {
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