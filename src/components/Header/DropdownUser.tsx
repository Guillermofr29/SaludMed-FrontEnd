import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faRightFromBracket,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import UserOne from '../../images/user/user-1.jpg';
import { useUser } from '../../context/UserContext';

interface DropdownUserProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
const DropdownUser: React.FC<DropdownUserProps> = ({ setIsAuthenticated }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const { user } = useUser();
  const nombre = user?.name || 'Nombre';
  const especialidad = user?.specialty || 'Especialidad';
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setNombre(localStorage.getItem('userName') || 'Nombre');
  //     setEspecialidad(localStorage.getItem('userSpecialty') || 'Especialidad');
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userSpecialty');
    localStorage.removeItem('rolID');
    sessionStorage.removeItem('sessionCheck');
    navigate('/login');
  };

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {nombre}
          </span>
          <span className="block text-xs">{especialidad}</span>
        </span>
        <span className="h-12 w-12 rounded-full overflow-hidden">
          <img
            src={UserOne}
            alt="User"
            className="h-full w-full object-cover"
          />
        </span>
        <FontAwesomeIcon icon={faChevronDown} />
      </Link>
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <FontAwesomeIcon icon={faUser} />
              Mi perfil
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          Log Out
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  );
};
export default DropdownUser;