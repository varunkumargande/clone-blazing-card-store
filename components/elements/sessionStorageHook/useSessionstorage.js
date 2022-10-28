import { useState, useEffect } from "react";

const useSessionstorage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(JSON.parse(sessionStorage.getItem("blazingUser")));
  }, []);

  return data;
};

export default useSessionstorage;
