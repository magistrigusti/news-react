import styles from './Categories.module.css';

const Categories = ({categories, setSelectedCategory, selectedCategory}) => {
  return (
    <div className={styles.categories}>
      <button onClick={() => setSelectedCategory(null)}
        className={!selectedCategory ? styles.active : styles.item}
      >
        All
      </button>

      {categories.map(category => {
          return (
            <button className={selectedCategory === category ? styles.active : styles.item}
              onClick={() => setSelectedCategory(category)}
              key={category}>
              {category}
            </button>
          )
        })
      }
    </div>
  );
};

export default Categories;