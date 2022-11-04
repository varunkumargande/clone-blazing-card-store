import { useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

// This hook will enable the eventsocket connection for the specified url
export default function useEventSocket(resoureUrl, global = false) {
  const [data, setData] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStatus, setIsStatus] = useState(true);

  useEffect(() => {
    if (
      isLoggedIn !== !!localStorage.getItem("blazingUser") &&
      typeof window !== "undefined"
    ) {
      setIsLoggedIn(!!localStorage.getItem("blazingUser"));
    }
  }, [typeof window]);

  useEffect(() => {
    if (isLoggedIn || global) {
      const token = localStorage.getItem("blazingToken");
      const chatHeader = {
        Authorization: `Bearer ${token}`,
      };
      // const sse = new EventSourcePolyfill(`${resoureUrl}`, { // will remove in future
      //   headers: chatHeader,
      // });
      const sse = new EventSource(`${resoureUrl}`);

      function handleStream(data) {
        setData(JSON.parse(data));
      }

      sse.onmessage = (e) => {
        handleStream(e.data);
      };

      sse.onerror = (e) => {
        sse.close();
        setIsStatus(!isStatus);
      };

      return () => {
        sse.close();
        setIsStatus(!isStatus);
      };
    }
  }, [isLoggedIn, isStatus, global]);

  return {
    data,
  };
}
