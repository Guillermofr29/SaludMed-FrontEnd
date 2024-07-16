import React, { useState } from 'react';

const FormularioContacto: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ciudad: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ciudad: '',
    mensaje: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {
      nombre: '',
      email: '',
      telefono: '',
      ciudad: '',
      mensaje: '',
    };

    if (!formData.nombre) {
      newErrors.nombre = 'El nombre es requerido';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
      isValid = false;
    }

    if (!formData.telefono) {
      newErrors.telefono = 'El teléfono es requerido';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe tener 10 dígitos';
      isValid = false;
    }

    if (!formData.ciudad) {
      newErrors.ciudad = 'La ciudad es requerida';
      isValid = false;
    }

    if (!formData.mensaje) {
      newErrors.mensaje = 'El mensaje es requerido';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const { nombre, email, telefono, ciudad, mensaje } = formData;
      const whatsappNumber = '9981969840';

      const message = `Nombre: ${nombre}%0AEmail: ${email}%0ATeléfono: ${telefono}%0ACiudad: ${ciudad}%0AMensaje: ${mensaje}`;
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

      window.open(whatsappURL, '_blank');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-[#34495e]">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Solicitar información
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${errors.nombre ? 'border-red-500' : ''}`}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono (10 dígitos)"
              value={formData.telefono}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${errors.telefono ? 'border-red-500' : ''}`}
            />
            {errors.telefono && (
              <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="ciudad"
              placeholder="Ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${errors.ciudad ? 'border-red-500' : ''}`}
            />
            {errors.ciudad && (
              <p className="text-red-500 text-sm mt-1">{errors.ciudad}</p>
            )}
          </div>
          <div>
            <textarea
              name="mensaje"
              placeholder="Mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${errors.mensaje ? 'border-red-500' : ''}`}
              rows={4}
            ></textarea>
            {errors.mensaje && (
              <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 bg-blue text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioContacto;
