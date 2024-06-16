import { MostPrescripMed } from '../../interfaces/Dashboard/MostPrescripMed';

const MostPrescripMedData: MostPrescripMed[] = [
  {
    NoMedicamento: 'MED001',
    NombreMedicamento: 'Medicamento 1',
    VecesRecetado: 12,
  },
  {
    NoMedicamento: 'MED002',
    NombreMedicamento: 'Medicamento 2',
    VecesRecetado: 12,
  },
  {
    NoMedicamento: 'MED003',
    NombreMedicamento: 'Medicamento 3',
    VecesRecetado: 12,
  },
  {
    NoMedicamento: 'MED004',
    NombreMedicamento: 'Medicamento 4',
    VecesRecetado: 12,
  },
  {
    NoMedicamento: 'MED005',
    NombreMedicamento: 'Medicamento 5',
    VecesRecetado: 12,
  },
  {
    NoMedicamento: 'MED006',
    NombreMedicamento: 'Medicamento 6',
    VecesRecetado: 12,
  },
  {
    NoMedicamento: 'MED007',
    NombreMedicamento: 'Medicamento 7',
    VecesRecetado: 12,
  },
  
];

const TableMostPrescripMed = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Medicamentos mas recetados
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              No.Medicamento
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Nombre Medicamento
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Veces Recetado
            </h5>
          </div>
        </div>

        {MostPrescripMedData.map((MostPrescripMed, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${
              key === MostPrescripMedData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              {/* <div className="flex-shrink-0">
                <img src={brand.logo} alt="Brand" />
              </div> */}
              <p className="text-black dark:text-white">
                {MostPrescripMed.NoMedicamento}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{MostPrescripMed.NombreMedicamento}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{MostPrescripMed.VecesRecetado}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableMostPrescripMed;
