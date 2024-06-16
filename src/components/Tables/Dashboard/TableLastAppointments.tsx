import { LastAppointments } from '../../interfaces/Dashboard/LastAppointments';

const LastAppointmentsData: LastAppointments[] = [
  {
    // logo: BrandOne,
    NoCita: 'CIT001',
    Paciente: 'Joe Doe Moe',
    Fecha: '24/04/24',
  },
  {
    // logo: BrandOne,
    NoCita: 'CIT002',
    Paciente: 'Joe Doe Moe',
    Fecha: '24/04/24',
  },
  {
    // logo: BrandOne,
    NoCita: 'CIT003',
    Paciente: 'Joe Doe Moe',
    Fecha: '24/04/24',
  },
  {
    // logo: BrandOne,
    NoCita: 'CIT004',
    Paciente: 'Joe Doe Moe',
    Fecha: '24/04/24',
  },
  {
    // logo: BrandOne,
    NoCita: 'CIT005',
    Paciente: 'Joe Doe Moe',
    Fecha: '24/04/24',
  },
];

const TableLastAppointments = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Últimas Citas
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              No.Cita
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Nombre Paciente
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Fecha
            </h5>
          </div>
          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Sales
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Conversion
            </h5>
          </div> */}
        </div>

        {LastAppointmentsData.map((LastAppointments, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${
              key === LastAppointmentsData.length - 1
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
                {LastAppointments.NoCita}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{LastAppointments.Paciente}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{LastAppointments.Fecha}</p>
            </div>

            {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.conversion}%</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableLastAppointments;
