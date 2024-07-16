import React from 'react';
import NewsCard from './NewsCards';

interface News {
  title: string;
  urlToImage: string;
  url: string;
}

interface NewsGridProps {
  news: News[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ news }) => {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600 p-10">
        Noticias relevantes
      </h2>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {news.map((item, index) => (
          <NewsCard key={index} image={item.urlToImage} url={item.url} />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;