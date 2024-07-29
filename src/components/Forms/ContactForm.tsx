import React, { useState, FormEvent} from 'react';
import emailjs from 'emailjs-com';

const ContactForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };

    const formatFecha = (fecha: string) => {
        const [year, month, day] = fecha.split('-');
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        const formattedDay = String(date.getDate()).padStart(2, '0');
        const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
        const formattedYear = date.getFullYear();
        return `${formattedDay}-${formattedMonth}-${formattedYear}`;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setSubmitMessage('Por favor, introduce un email válido.');
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const result = await emailjs.send(
                'service_fw1f0dd', 
                'template_eegpa25', 
                {
                    from_name: name,
                    from_email: email,
                    to_email: 'saludmed92@gmail.com',
                    message: `Hola, soy ${name} y quiero agendar una cita el día ${formatFecha(day)} a las ${time}. Mi email es: ${email}, espero su respuesta, saludos`,
                },
                '9iGP5GktXg2sET95d'
            );

            console.log(result.text);
            setSubmitMessage('¡Mensaje enviado con éxito!');
            setName('');
            setEmail('');
            setDay('');
            setTime('');
        } catch (error) {
            console.error(error);
            setSubmitMessage('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
            <div className="mb-4">
                <label htmlFor="name" className="block text-white font-bold mb-2">Nombre completo:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    placeholder='Joe Doe Moe'
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-white font-bold mb-2">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder='joedoemoe@mail.com'
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="day" className="block text-white font-bold mb-2">Día:</label>
                <input
                    type="date"
                    id="day"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="time" className="block text-white font-bold mb-2">Hora:</label>
                <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-white text-blue-500 font-bold py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors duration-300"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
            {submitMessage && <p className="mt-4 text-white">{submitMessage}</p>}
        </form>
    );
};

export default ContactForm;
