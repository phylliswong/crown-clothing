import { useContext, Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../product-card/product-card.component";

const CategoryPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  const navigate = useNavigate();

  const gotToHatsHandler = () => {
    navigate('/shop/hats');
  }

  return (
    <Fragment>
      {
        Object.keys(categoriesMap).map(title => (
          <Fragment key={title}>
            <h2 onClick={gotToHatsHandler}>{title}</h2>

            <div className="products-container">
              {categoriesMap[title].slice(0,4).map((product) => {
                return <ProductCard product={product} key={product.id}/>
              })}
            </div>
          </Fragment>
        ))
      }
    </Fragment>
  )
}

export default CategoryPreview;
