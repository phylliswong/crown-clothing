import {
  DirectoryItemContainer,
  Body,
  BackgroundImage,
} from './directory-item.styles';


const DirectoryItem = ({ category }) => {
  const { title, subtitle, imageUrl } = category;
  return (
    <DirectoryItemContainer>
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