import './directory-item.styles.scss';

const DirectoryItem = ({ category }) => {
  const { title, subtitle, imageUrl } = category;
  return (
    <div className="directory-item-container" >
      <div className="background-image" style={{
        backgroundImage:`url(${imageUrl})`
      }}/>
      <div className="body">
        <h2 className="directory-item">{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>

  );
}

export default DirectoryItem;