import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { categoryApi } from "../../api";

export const CategoriesDataContext = createContext();

// This context will handle all notifications related stuff globally
export function CategoriesDataProvider(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = categoryApi(dispatch);
    console.log("Data", data);
  }, []);

  const contextValue = useMemo(() => ({}), []);

  return <CategoriesDataContext.Provider {...props} value={contextValue} />;
}

export function useCategoriesData() {
  return useContext(CategoriesDataContext);
}

export default CategoriesDataProvider;
