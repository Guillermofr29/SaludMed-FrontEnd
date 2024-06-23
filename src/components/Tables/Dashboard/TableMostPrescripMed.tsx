import useMedicamentosMasRecetados from '../../../hooks/Dashboard/useMostPrescripMedData';

const TableMostPrescripMed = () => {
  const { mostPrescripMed, loading, error } = useMedicamentosMasRecetados();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Medicamentos más recetados
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
        <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              No. Medicamento
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Medicamento
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Veces Recetado
            </h5>
          </div>
        </div>

        {mostPrescripMed.map((medicamento, index) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${
              index === mostPrescripMed.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={index}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {medicamento.NoMedicamento}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {medicamento.medicamento}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{medicamento.numeroDeVeces}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableMostPrescripMed;
