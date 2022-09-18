import { useNavigate } from 'react-router-dom';
import {
  DirectoryItemContainer,
  Body,
  BackgroundImage,
} from './directory-item.styles';


const DirectoryItem = ({ category }) => {
  const { title, subtitle, imageUrl, route } = category;
  const navigate = useNavigate();
  
  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage 
        imageUrl={imageUrl}
      />
      <Body>
        <h2 className="directory-item">{title}</h2>
        <p>{subtitle}</p>
      </Body>
    </DirectoryItemContainer>

  );
}

export default DirectoryItem;