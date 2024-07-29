import React from 'react';
import Header from '../../components/Header/HomePage/Header';
import Footer from '../../components/Footer/Footer';
import Carrusel from '../../components/Slider/SliderHomePage';
import GoogleMap from '../../components/Maps/GoogleMap';
import PexelsVideoCarousel from '../../components/Slider/SliderHomePagev2';
import NewsContainer from '../../components/Cards/NewsApi/NewsContainer';
import Features from '../../components/Features/Features';
import ContactForm from '../../components/Forms/ContactForm';

const HomePage: React.FC = () => {
  const customBlue = '#fff'; //012C6D

  return (
    <>
      <Header />
      <Carrusel />
      <main className="bg-gray-100">
        <section className=" bg-blue lg:grid grid-cols-1 md:grid-cols-2 gap-8 py-20 px-10">
          <div>
            <h3
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
              style={{ color: customBlue }}
            >
              TU CLÍNICA EN LA NUBE
            </h3>
            <p
              className="text-lg sm:text-xl md:text-3xl font-semibold mb-4"
              style={{ color: customBlue }}
            >
              El software médico para clínicas personalizado y adaptado a tu
              especialidad
            </p>
            <p
              className="text-gray-700 mb-4"
              style={{ color: customBlue }}
            >
              SaludMed te garantiza un acceso inmediato a los datos de tu
              clínica desde cualquier dispositivo con conexión a internet, sin
              necesidad de instalación, sin cuota de alta y sin permanencia.
            </p>
            <p
              className="text-gray-700 mb-4"
              style={{ color: customBlue }}
            >
              Un software médico adaptado a tu especialidad, con cobertura para
              varios centros desde una sola plataforma.
            </p>
            <button
              className="inline-block rounded text-white px-4 py-2 my-4  transition-colors duration-300"
              style={{ border: 'solid 2px' }}
            >
              Más...
            </button>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-full md:w-3/4 lg:w-full">
              <PexelsVideoCarousel />
            </div>
          </div>
        </section>

        <Features />

        <section className="bg-blue py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/2">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">
                  Encuentra nuestra clínica
                </h2>
                <GoogleMap />
              </div>
              <div className="w-full lg:w-1/2">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">
                  Agenda una cita
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-15">
          <NewsContainer />
        </section>

      </main>
      <Footer />
    </>
  );
};

export default HomePage;
