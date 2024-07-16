import React from 'react';
import FeatureCard from './FeatureCard';
import {
  FaClinicMedical,
  FaLaptopMedical,
  FaCalendarAlt,
  FaMobileAlt,
  FaFileInvoiceDollar,
  FaBullhorn,
} from 'react-icons/fa';

const Features: React.FC = () => {
  const features = [
    {
      title: 'EXPEDIENTE CLÍNICO ELECTRÓNICO',
      description:
        'Mantén organizada la información de tus pacientes y cumple con los lineamientos de la NOM y Secretaría de Salud.',
      icon: <FaClinicMedical size={40} />,
    },
    {
      title: 'TELEMEDICINA ELEONOR',
      description:
        '¡Un gran paso al futuro! Ahora puedes brindar tu servicio médico a distancia.',
      icon: <FaLaptopMedical size={40} />,
    },
    {
      title: 'AGENDA MÉDICA EN LÍNEA',
      description:
        'Maneja tu agenda médica en línea desde tu móvil y coordínala con tu asistente.',
      icon: <FaCalendarAlt size={40} />,
    },
    {
      title: 'APP DEL MÉDICO',
      description:
        'Con la aplicación móvil puedes consultar tu agenda en tiempo real y revisar los expedientes de tus pacientes fuera del consultorio.',
      icon: <FaMobileAlt size={40} />,
    },
    {
      title: 'FACTURACIÓN ELECTRÓNICA',
      description:
        '¡Dile adiós a los complicados programas de Facturación! Ahora desde Eleonor genera tus facturas médicas más rápido y de una forma sencilla.',
      icon: <FaFileInvoiceDollar size={40} />,
    },
    {
      title: 'MARKETING',
      description:
        '¡Atrae nuevos pacientes! Haz que te encuentren más rápido en los buscadores de Google dentro de nuestro Directorio Médico.',
      icon: <FaBullhorn size={40} />,
    },
  ];

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Funcionalidades
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
