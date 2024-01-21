import styles from './Main.module.css';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import NewsList from '../../components/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';
import Categories from '../../components/Categories/Categories';
import Search from '../../components/Search/Search';
import { getNews, getCategories } from '../../api/apiNews';
import { useDebounce } from '../../helpers/hooks/useDebounce';
import { useFetch } from '../../helpers/hooks/useFetch';
import { useFilters } from '../../helpers/hooks/useFilters';
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants';

const Main = () => {
  const {filters, changeFilter} = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: null,
    keywords: '',
  });

  const debouncedKeywords = useDebounce(filters.keywords, 1500);

  const {data, isLoading} = useFetch(getNews, {
    ...filters,
    keywords: debouncedKeywords,
  });

  const {data: dataCategories} = useFetch(getCategories);

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES) {
      changeFilter('page_number', filters.page_number + 1);
    }
  }

  const handlePreviousPage = () => {
    if (filters.page_number > 1) {
      changeFilter('page_Number', filters.page_number - 1);
    }
  }

  const handlePageClick = (pageNumber) => {
    changeFilter('page_number', pageNumber);
  }

  return (
    <main className={styles.main} >
      {dataCategories ? 
        <Categories categories= {dataCategories.categories}
          selectedCategory={filters.category}
          setSelectedCategory={(category) => changeFilter('category', category)}
        />
      : null}

      <Search keywords={filters.keywords} 
        setKeywords={(keywords) => changeFilter('keywords', keywords)}
      />

      <NewsBanner isLoading={isLoading}
        item={data && data.news && data.news[0]}
      />

      <Pagination handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
      />

      <NewsList isLoading={isLoading} news={data?.news} />

      <Pagination handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
      />
    </main>
  )
}

export default Main;