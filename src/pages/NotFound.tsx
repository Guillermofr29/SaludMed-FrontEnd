import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate();
    const goToHomePage = () => {
        navigate('/');
    };

    return (
        <section className="bg-gray dark:bg-black-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue dark:text-primary-500">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Opps! Página no encontrada.</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Lo sentimos, parece que esta página no existe, regresa el inicio. </p>
                    <button onClick={goToHomePage} className="inline-flex text-white bg-blue hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Ir a Inicio</button>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
