import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

export const CurrentDeviceContext = createContext();

// This context will handle all notifications related stuff globally
export function CurrentDeviceProvider(props) {
  const [deviceWidth, setdeviceWidth] = useState(0);
  const [isMobile, setIsMobileDevice] = useState(false);

  const resizeWindow = () => {
    setdeviceWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  useEffect(() => {
    setIsMobileDevice(deviceWidth <= 1024);
  }, [deviceWidth]);

  const contextValue = useMemo(
    () => ({
      isMobile,
    }),
    [isMobile]
  );

  return <CurrentDeviceContext.Provider {...props} value={contextValue} />;
}

export function useIsMobile() {
  return useContext(CurrentDeviceContext);
}

export default CurrentDeviceProvider;
