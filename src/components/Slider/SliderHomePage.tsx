import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carrusel = () => {
  const [images, setImages] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://api.pexels.com/v1/search', {
          headers: {
            Authorization: 'A59kbNTq4ynjqfuyVIEfhFu0naoAgVUO2jQVcBOQbnDbjX54ZGTjmFpU', 
          },
          params: {
            query: 'Hospital',
            per_page: 16,
          },
        });
        setImages(response.data.photos);
      } catch (error) {
        console.error('Error fetching images from Pexels:', error);
      }
    };

    fetchImages();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <></>,
  };

  return (
    <div className="relative h-120 lg:h-120">
      {images.length > 0 && (
        isMobile ? (
          <div>
            <img
              src={images[0].src.large2x}
              alt={images[0].photographer}
              className="w-full h-auto object-cover rounded-lg shadow-md"
              style={{ maxHeight: '500px' }}
            />
          </div>
        ) : (
          <Slider {...settings}>
            {images.map((image: any) => (
              <div key={image.id}>
                <img
                  src={image.src.large2x}
                  alt={image.photographer}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                  style={{ maxHeight: '500px' }}
                />
              </div>
            ))}
          </Slider>
        )
      )}
    </div>
  );
};

export default Carrusel;
