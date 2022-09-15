import { createContext, useEffect, useState } from "react";
import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  useEffect(() => {
    const getCategories = async () => {
      const categoryMap = await getCollectionAndDocuments();
      setCategoriesMap(categoryMap);
    }
    getCategories();
  },[]);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
