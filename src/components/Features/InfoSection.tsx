import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div className="flex-1">
          <img
            src="/path-to-your-image.png"
            alt="Doctor holding tablet"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex-1 md:pl-10 mt-6 md:mt-0 text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Más que un expediente clínico electrónico
          </h2>
          <p className="text-gray-700 mb-4 font-semibold">
            Nuestra médicos nos define cómo la herramienta ideal para la
            administración completa de sus consultorios médicos.
          </p>
          <p className="text-gray-700 mb-4 font-semibold">
            Eleonor cuenta con módulos y funcionalidades personalizables que te
            ayudan a ofrecer un mejor servicio a tus pacientes y ahorrar tiempo
            de una manera fácil y segura.
          </p>
          <p className="text-gray-700 mb-4 font-semibold">
            ¡No te adaptes a tu herramienta, que Eleonor se adapte a ti!
          </p>
          <button className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg transition-colors duration-300 mb-4">
            Prueba gratis
          </button>
          <p className="text-gray-700 mb-4 font-semibold">
            ¿Quieres saber más?{' '}
            <a href="#" className="text-blue-600 font-semibold">
              Programa tu asesoría con un Experto Eleonor
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
