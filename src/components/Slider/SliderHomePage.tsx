import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carrusel = () => {
  const [images, setImages] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const fullText = "Bienvenido a SaludMed!";

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

    handleResize();
    window.addEventListener('resize', handleResize);

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(typingInterval);
    };
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
    fade: true,
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.length > 0 && (
        <>
          {isMobile ? (
            <div className="w-full h-full">
              <img
                src={images[0].src.large2x}
                alt={images[0].photographer}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <Slider {...settings} className="w-full h-full">
              {images.map((image: any) => (
                <div key={image.id} className="w-full h-full">
                  <img
                    src={image.src.large2x}
                    alt={image.photographer}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          )}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center px-4">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                {displayText.split(' ').map((word, index) => {
                  if (word === 'Salud') {
                    return <span key={index}>Salud</span>;
                  } else if (word === 'Med!') {
                    return <span key={index}>Med!</span>;
                  }
                  return <span key={index}>{word} </span>;
                })}
              </h1>
              <p className="text-white text-2xl md:text-4xl mt-4">
                Tu clínica de confianza
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrusel;