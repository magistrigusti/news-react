import styles from './LatestNews.module.css';
import BannerList from '../BannersList/BannersList';

const LatestNews = ({banners, isLoading}) => {
  return (
    <section className={styles.section}>
      <BannerList banners={banners} isLoading={isLoading} />
    </section>
  )
}

export default LatestNews;