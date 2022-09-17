import CategoryItem from '../directory-item/directory-item.component.jsx'

import { DirectoryContainer } from './directory.styles.jsx';


const Directory = ({ categories }) => {
  return (
    <DirectoryContainer>
      { categories.map(category => 
        <CategoryItem category={category} key={category.id} />
      )}
    </DirectoryContainer>
  );
}

export default Directory;
