import styles from './Search.module.css';

const Search = ({keywords, setKeywords}) => {
  return (
    <div className={styles.search}>
      <input className={styles.input} 
        onChange={(event) => setKeywords(event.target.value)}
        placeholder='JavaScript'
        type='text' value={keywords} />
    </div>
  );
};

export default Search;