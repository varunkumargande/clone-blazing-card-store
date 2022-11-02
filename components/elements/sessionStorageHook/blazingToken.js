import { useState, useEffect } from "react";

const blazingToken = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(JSON.parse(sessionStorage.getItem("blazingToken")));
  }, []);

  return data;
};

export default blazingToken;
