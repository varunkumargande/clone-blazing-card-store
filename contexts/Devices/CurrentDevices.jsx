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
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobile, setIsMobileDevice] = useState(false);

  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  // const isMobile = () => {
  //   if (windowWidth < 1024) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  useEffect(() => {
    setIsMobileDevice(windowWidth <= 1024)
  }, [windowWidth]);

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
