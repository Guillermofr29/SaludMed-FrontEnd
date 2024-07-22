import React from 'react';
import Header from '../../components/Header/HomePage/Header';
import Footer from '../../components/Footer/Footer';
import Carrusel from '../../components/Slider/SliderHomePage';
import GoogleMap from '../../components/Maps/GoogleMap';
import PexelsVideoCarousel from '../../components/Slider/SliderHomePagev2';
import NewsContainer from '../../components/Cards/NewsApi/NewsContainer';
import Features from '../../components/Features/Features';

const HomePage: React.FC = () => {
  const customBlue = '#012C6D';

  return (
    <>
      <Header />
      <Carrusel />
      <main className="bg-gray-100 py-10">
        <section className="mt-8 lg:mt-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-8 p-8">
          <div>
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: customBlue }}
            >
              TU CLÍNICA EN LA NUBE
            </h3>
            <p
              className="text-3xl font-semibold mb-4"
              style={{ color: customBlue }}
            >
              El software médico para clínicas personalizado y adaptado a tu
              especialidad
            </p>
            <p
              className="text-gray-700 mb-4 font-semibold"
              style={{ color: customBlue }}
            >
              SaludMed te garantiza un acceso inmediato a los datos de tu
              clínica desde cualquier dispositivo con conexión a internet, sin
              necesidad de instalación, sin cuota de alta y sin permanencia.
            </p>
            <p
              className="text-gray-700 mb-4 font-semibold"
              style={{ color: customBlue }}
            >
              Un software médico adaptado a tu especialidad, con cobertura para
              varios centros desde una sola plataforma.
            </p>
            <button
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
              style={{ backgroundColor: '#063D54' }}
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

        {/* <section className="mt-8 lg:mt-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-8 p-8">
          <div className="flex justify-center items-center order-last md:order-first">
            <div className="w-full md:w-3/4 lg:w-full">
              <PexelsVideoCarousel />
            </div>
          </div>
          <div>
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: customBlue }}
            >
              TU CLÍNICA EN LA NUBE
            </h3>
            <p
              className="text-3xl font-semibold mb-4"
              style={{ color: customBlue }}
            >
              El software médico para clínicas personalizado y adaptado a tu
              especialidad
            </p>
            <p
              className="text-gray-700 mb-4 font-semibold"
              style={{ color: customBlue }}
            >
              SaludMed te garantiza un acceso inmediato a los datos de tu
              clínica desde cualquier dispositivo con conexión a internet, sin
              necesidad de instalación, sin cuota de alta y sin permanencia.
            </p>
            <p
              className="text-gray-700 mb-4 font-semibold"
              style={{ color: customBlue }}
            >
              Un software médico adaptado a tu especialidad, con cobertura para
              varios centros desde una sola plataforma.
            </p>
            <button
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
              style={{ backgroundColor: '#063D54' }}
            >
              Más...
            </button>
          </div>
        </section> */}

        {/* <div className="hidden md:block">
          <Form />
        </div> */}

        <section className="mt-8 lg:mt-12 px-6 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Encuentra nuestra clínica
          </h2>
          <div className="flex justify-center items-center">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
              <GoogleMap />
            </div>
          </div>
          <div>
          <NewsContainer/>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default HomePage;
