import { useContext, Fragment } from "react";
import { Outlet } from "react-router-dom";
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from "../../components/category-preview/category-preview.component";
import ProductCard from "../../components/product-card/product-card.component";

import './shop.styles.scss';

const Shop = () => {
  return (
    <Fragment>
      <CategoryPreview />
      <Outlet />
    </Fragment>
  )
}

export default Shop;
