import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PexelsVideoCarousel: React.FC = () => {
  const [videos, setVideos] = useState<string[]>([]);
  const apiKey = 'A59kbNTq4ynjqfuyVIEfhFu0naoAgVUO2jQVcBOQbnDbjX54ZGTjmFpU'; // Reemplaza con tu API key de Pexels

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          'https://api.pexels.com/videos/search',
          {
            headers: {
              Authorization: apiKey,
            },
            params: {
              query: 'clinic',
              per_page: 5,
            },
          },
        );
        setVideos(
          response.data.videos.map((video: any) => video.video_files[0].link),
        );
      } catch (error) {
        console.error('Error fetching videos from Pexels', error);
      }
    };

    fetchVideos();
  }, [apiKey]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Desactivamos el cambio automático
    nextArrow: <></>,
    prevArrow: <></>,
  };

  return (
    <Slider {...settings}>
      {videos.map((url, index) => (
        <div key={index}>
          <video
            src={url}
            controls
            className="w-full rounded-lg"
            style={{ maxHeight: '300px' }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default PexelsVideoCarousel;
