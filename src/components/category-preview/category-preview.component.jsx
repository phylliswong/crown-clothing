import { Link } from 'react-router-dom';
import ProductCard from "../product-card/product-card.component";

import {
  CategoryPreviewContainer,
  CategoryTitle,
  CategoryPreviewProducts,
} from './category-preview.styles';


const CategoryPreview = ({ title, products }) => {

  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryTitle to={title}>
          {title.toUpperCase()}
        </CategoryTitle>
      </h2>
      <CategoryPreviewProducts>
        {products.filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          )
        )}
      </CategoryPreviewProducts>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview;
