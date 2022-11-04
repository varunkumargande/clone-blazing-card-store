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

// This context will handle fetch category data only once
export function CategoriesDataProvider(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    categoryApi(dispatch);
  }, []);

  const contextValue = useMemo(() => ({}), []);

  return <CategoriesDataContext.Provider {...props} value={contextValue} />;
}

export function useCategoriesData() {
  return useContext(CategoriesDataContext);
}

export default CategoriesDataProvider;
