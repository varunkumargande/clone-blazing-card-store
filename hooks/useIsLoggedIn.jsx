import { useEffect, useState } from "react";

// This hook will let you know whether use logged in
export default function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (
      isLoggedIn !== !!localStorage.getItem("blazingUser") &&
      typeof window !== "undefined"
    ) {
      setIsLoggedIn(!!localStorage.getItem("blazingUser"));
    }
  }, [typeof window]);

  return {
    isLoggedIn,
  };
}
