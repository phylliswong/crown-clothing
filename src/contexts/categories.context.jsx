import { createContext, useEffect, useReducer } from "react";
import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

// TODO: convert to useReducer

export const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES_MAP: 'SET_CATEGORIES_MAP',
}

const INITIAL_STATE = {
  categoriesMap: {},
}

const categoriesReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
      return {
        ...state,
        categoriesMap: payload
      };
    default:
      return state;
  }
};

export const CategoriesProvider = ({ children }) => {
  const [ { categoriesMap }, dispatch ] = useReducer(categoriesReducer, INITIAL_STATE);

  const setCategoriesMap = () => {
    dispatch({ type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, payload: categoriesMap });
  }
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
