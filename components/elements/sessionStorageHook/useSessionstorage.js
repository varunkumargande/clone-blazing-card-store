import { useState, useEffect } from "react";

const useSessionstorage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("blazingUser")));
  }, []);

  return data;
};

export default useSessionstorage;
