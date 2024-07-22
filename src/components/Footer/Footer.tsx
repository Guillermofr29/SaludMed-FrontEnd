import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-blue text-white p-4 mt-12">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-lg font-semibold mb-4">© Salud Med 2024</p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <p className="flex items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            <span>Av. Principal 123, Colonia Centro, Cancún</span>
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            <span>Tel: 555-123456</span>
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <span>Email: saludmed92@gmail.com</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;