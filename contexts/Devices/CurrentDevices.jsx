import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

export const CurrentDevice = createContext();

// This context will handle all notifications related stuff globally
export function CurrentDeviceProvider(props) {
  const [windowWidth, setWindowWidth] = useState(0);

  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  const isMobileDevice = () => {
    if (windowWidth < 1024) {
      return true;
    } else {
      return false;
    }
  };

  const contextValue = useMemo(
    () => ({
      isMobileDevice,
    }),
    [windowWidth]
  );

  return <CurrentDevice.Provider {...props} value={contextValue} />;
}

export function useNotifications() {
  return useContext(CurrentDevice);
}

export default CurrentDeviceProvider;
