import React from 'react';

interface NewsCardProps {
  image: string;
  url: string;
  title: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ image, url, title }) => {
  const handleClick = () => {
    window.location.href = url;
  };

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length <= maxLength) return title;
    return title.slice(0, maxLength) + '...';
  };

  return (
    <div
      className="mb-4 bg-white shadow-md rounded-lg overflow-hidden break-inside-avoid-column cursor-pointer"
      onClick={handleClick}
    >
      <img src={image} alt="news" className="w-full h-40 object-cover" />
      <div className="p-2">
        <h3 className="font-semibold text-sm">
          {truncateTitle(title, 45)}
        </h3>
      </div>
    </div>
  );
};

export default NewsCard;