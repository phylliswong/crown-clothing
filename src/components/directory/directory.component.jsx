import { hasPointerEvents } from '@testing-library/user-event/dist/utils/index.js';
import CategoryItem from '../directory-item/directory-item.component.jsx'

import { DirectoryContainer } from './directory.styles.jsx';

const categories = [
  {
    "id": 1,
    "title": "hats",
    "subtitle": "shop now",
    "imageUrl": "https://i.ibb.co/cvpntL1/hats.png",
    "route": "shop/hats",
  },
  {
    "id": 2,
    "title": "jackets",
    "subtitle": "shop now",
    "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png",
    "route": "shop/jackets",
  },
  {
    "id": 3,
    "title": "sneakers",
    "subtitle": "shop now",
    "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png",
    "route": "shop/sneakers",
  },
  {
    "id": 4,
    "title": "womens",
    "subtitle": "shop now",
    "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png",
    "route": "shop/womens",
  },
  {
    "id": 5,
    "title": "mens",
    "subtitle": "shop now",
    "imageUrl": "https://i.ibb.co/R70vBrQ/men.png",
    "route": "shop/mens",
  }
];

const Directory = () => {

  return (
    <DirectoryContainer>
      { categories.map(category => 
        <CategoryItem category={category} key={category.id} />
      )}
    </DirectoryContainer>
  );
}

export default Directory;
