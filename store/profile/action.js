import { useCallback } from "react";
import { US_CODE } from "../../components/Constants";

export const actionTypes = {
  GET_PROFILE_REQUEST: "GET_PROFILE_REQUEST",
};

export function getProfile(payload) {
  return { type: actionTypes.GET_PROFILE_REQUEST, payload: payload };
}

export const fetchZipCodeList = (
  zipId,
  setZipCodeListLoader,
  setZipCodeList,
  dispatch
) => {
  setZipCodeListLoader(true);
  zipCodeListApi(
    US_CODE,
    zipId,
    setZipCodeList,
    dispatch,
    setZipCodeListLoader
  );
};
