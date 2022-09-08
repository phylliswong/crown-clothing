import './category-item.styles.scss';

const CategoryItem = ({ category }) => {
  const { id, title, subtitle, imageUrl } = category;
  return (
    <div className="category-container" key={id}>
      <div className="background-image" style={{
        backgroundImage:`url(${imageUrl})`
      }}/>
      <div className="category-body-container">
        <h2 className="category">{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>

  );
}

export default CategoryItem;