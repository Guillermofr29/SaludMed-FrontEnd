const Loader = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue border-t-transparent"></div>
      <a className="mt-4">Cargando</a>
    </div>
  );
};

export default Loader;
