import React from 'react';
import FeatureCard from './FeatureCard';
import {
  FaUserMd,
  FaCalendarCheck,
  FaPrescription,
  FaMobileAlt,
  FaFilePdf,
  FaChartLine,
} from 'react-icons/fa';

const Features: React.FC = () => {

  const features = [
    {
      title: 'GESTIÓN DE PACIENTES',
      description: 'Administra eficientemente los datos de tus pacientes, incluyendo historiales médicos, información de contacto y seguimiento de tratamientos.',
      icon: <FaUserMd size={40} />,
    },
    {
      title: 'GESTIÓN DE CITAS',
      description: 'Organiza y programa citas de manera eficiente, evitando conflictos de horarios y optimizando el tiempo de tu clínica.',
      icon: <FaCalendarCheck size={40} />,
    },
    {
      title: 'GESTIÓN DE RECETAS',
      description: 'Crea y administra recetas médicas de forma digital, asegurando precisión en las prescripciones y facilitando el seguimiento de medicamentos.',
      icon: <FaPrescription size={40} />,
    },
    {
      title: 'APP PORTABLE',
      description: 'Con la aplicación móvil puedes consultar tu agenda en tiempo real y revisar los expedientes de tus pacientes fuera del consultorio.',
      icon: <FaMobileAlt size={40} />,
    },
    {
      title: 'GENERACION DE RECETA PDF',
      description: 'Genera recetas en formato PDF de manera rápida y sencilla, facilitando su impresión o envío electrónico a los pacientes.',
      icon: <FaFilePdf size={40} />,
    },
    {
      title: 'VISUALIZACIÓN DE DATOS CLINICOS',
      description: 'Accede y analiza datos clínicos de manera intuitiva con gráficos y estadísticas, permitiendo un mejor seguimiento y toma de decisiones.',
      icon: <FaChartLine size={40} />,
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
