import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo/logoWhite.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGaugeSimpleHigh,
  faUserInjured,
  faCalendar,
  faFileWaveform,
  faUserDoctor,
  faPills,
  faArrowLeft,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  setIsAuthenticated,
}: SidebarProps) => {
  // const rol = localStorage.getItem('rolID') || 'rolId';
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

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
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-blue duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/" style={{ textAlign: 'center' }}>
          <img src={Logo} alt="Logo" width={'200px'} />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear flex-grow">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 lg:mt-9">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative text-xl flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-hoverBlue ${
                    (pathname === '/' || pathname.includes('dashboard')) &&
                    'bg-hoverBlue border-r-4 border-borderBlue'
                  }`}
                >
                  <FontAwesomeIcon icon={faGaugeSimpleHigh} />
                  Dashboard
                </NavLink>
              </li>

              {/* {rol === '2' && (
                <>
                  <li>
                    <NavLink
                      to="/medicos"
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-hoverBlue ${(pathname.includes('medicos')) &&
                        'bg-hoverBlue border-r-4 border-borderBlue'
                        }`}
                    >
                      <FontAwesomeIcon icon={faUserDoctor} />
                      Médicos
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/medicamentos"
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-hoverBlue ${(pathname.includes('medicamentos')) &&
                        'bg-hoverBlue border-r-4 border-borderBlue'
                        }`}
                    >
                      <FontAwesomeIcon icon={faPills} />
                      Medicamentos
                    </NavLink>
                  </li>
                </>
              )} */}

              {/* <!-- Menu Item Pacientes --> */}
              <li>
                <NavLink
                  to="/pacientes"
                  className={`group relative text-xl flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-hovreBlue ${
                    pathname.includes('pacientes') &&
                    'bg-hoverBlue border-r-4 border-borderBlue'
                  }`}
                >
                  <FontAwesomeIcon icon={faUserInjured} />
                  Pacientes
                </NavLink>
              </li>

              {/* <!-- Menu Item Citas --> */}
              <li>
                <NavLink
                  to="/citas"
                  className={`group relative text-xl flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-hoverBlue ${
                    pathname.includes('citas') &&
                    'bg-hoverBlue border-r-4 border-borderBlue'
                  }`}
                >
                  <FontAwesomeIcon icon={faCalendar} />
                  Citas
                </NavLink>
              </li>

              {/* <!-- Menu Item Recetas --> */}
              <li>
                <NavLink
                  to="/recetas"
                  className={`group relative text-xl flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-hoverBlue ${
                    pathname.includes('recetas') &&
                    'bg-hoverBlue border-r-4 border-borderBlue'
                  }`}
                >
                  <FontAwesomeIcon icon={faFileWaveform} />
                  Recetas
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
        <div className="mt-auto px-10 m-6 text-center">
          <button
            className="rounded-10 border border-stroke mx-6 py-2 px-4 font-medium text-white hover:shadow-1 dark:text-white dark:border-gray-500"
            type="button"
            onClick={handleLogout}
            // onClick={() => navigate(`/pacientes/editar-paciente/${patientId}`)}
          >
            Logout
            <FontAwesomeIcon icon={faRightFromBracket} className="ml-2 mt-1" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
