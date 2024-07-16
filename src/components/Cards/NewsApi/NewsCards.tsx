import React from 'react';

interface NewsCardProps {
  image: string;
  url: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ image, url }) => {
  const handleClick = () => {
    window.location.href = url;
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden break-inside-avoid-column m-2 cursor-pointer"
      onClick={handleClick}
    >
      <img src={image} alt="news" className="w-full h-48 object-cover" />
    </div>
  );
};

export default NewsCard;
