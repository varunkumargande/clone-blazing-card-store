import React, { useState, useEffect } from "react";
import { zipCodeListApi } from "../api/account/zipCodeApi";
import { US_CODE } from "../components/Constants";
import { useDispatch } from "react-redux";

export const useFetchZipCodeList = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [zipList, setZipList] = useState(null);
  const [zipCode, setZipCode] = useState(null);

  //   console.log(zipCode);

  useEffect(() => {
    setIsLoading(true);
    zipCodeListApi(US_CODE, zipCode, setZipList, dispatch, setIsLoading);
  }, [zipCode]);

  return [setZipCode, isLoading, zipList];
};
