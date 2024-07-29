import React, { useEffect, useState } from 'react';
import NewsGrid from './NewsGrid';
import { fetchNews } from '../../../services/NewsApi';
import Pagination from './Pagination';

const NewsContainer: React.FC = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 12;

  useEffect(() => {
    const getNews = async () => {
      const articles = await fetchNews();
      setNews(articles);
    };
    getNews();
  }, []);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='mx-8'>
      <NewsGrid news={currentNews} />
      <Pagination
        newsPerPage={newsPerPage}
        totalNews={news.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default NewsContainer;
