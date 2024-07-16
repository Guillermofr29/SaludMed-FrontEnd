import { Link } from 'react-router-dom';  
import Icon from '../../../images/logo/logoLogin.png'; 

const Header = () => {
  return (
    <header className="bg-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={Icon} alt="SaludMed Logo" className="h-12" />
          <h1 className="text-2xl font-bold text-gray-700">SaludMed</h1>
        </div>
        <Link
          to="/login"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
          style={{ backgroundColor: '#063D54' }}
        >
          Iniciar Sesión
        </Link>
      </div>
    </header>
  );
};

export default Header;
