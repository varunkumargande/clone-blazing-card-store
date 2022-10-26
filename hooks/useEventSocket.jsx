import { useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

// This hook will enable the eventsocket connection for the specified url
export default function useEventSocket(resoureUrl) {
  const [data, setData] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (
      isLoggedIn !== !!sessionStorage.getItem("spurtUser") &&
      typeof window !== "undefined"
    ) {
      setIsLoggedIn(!!sessionStorage.getItem("spurtUser"));
    }
  }, [typeof window]);

  useEffect(() => {
    if (isLoggedIn) {
      const token = sessionStorage.getItem("spurtToken");
      const chatHeader = {
        Authorization: `Bearer ${token}`,
      };
      const sse = new EventSourcePolyfill(`${resoureUrl}`, {
        headers: chatHeader,
      });

      function handleStream(data) {
        setData(JSON.parse(data));
      }

      sse.onmessage = (e) => {
        handleStream(e.data);
      };

      sse.onerror = (e) => {
        sse.close();
      };

      return () => {
        sse.close();
      };
    }
  });

  return {
    data,
  };
}
