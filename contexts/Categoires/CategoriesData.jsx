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
  const [isCategoriesFetched, setIsCategoriesFetched] = useState(false);

  const fetchCategories = async () => {
    const response = await categoryApi(dispatch);
    if (response.status) {
      setIsCategoriesFetched(true);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const contextValue = useMemo(
    () => ({ isCategoriesFetched }),
    [isCategoriesFetched]
  );

  return <CategoriesDataContext.Provider {...props} value={contextValue} />;
}

export function useCategoriesData() {
  return useContext(CategoriesDataContext);
}

export default CategoriesDataProvider;
