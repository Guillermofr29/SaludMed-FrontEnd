import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import useMotivosConsulta from '../../hooks/Dashboard/useMotivosConsulta';

const ChartMostCommonDiseases: React.FC = () => {
    const MedicoID = localStorage.getItem('userId') || 'Id';
    const { data, loading, error } = useMotivosConsulta(Number(MedicoID));

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const series = data.map(item => item.numeroDeVeces);
    const labels = data.map(item => item.motivo);

    const options: ApexOptions = {
        chart: {
            fontFamily: 'Satoshi, sans-serif',
            type: 'donut',
        },
        colors: ['#9774E2', '#6577F3', '#FF7474', '#C20097', '#00AA11'],
        labels: labels,
        legend: {
            show: false,
            position: 'bottom',
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    background: 'transparent',
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        responsive: [
            {
                breakpoint: 2600,
                options: {
                    chart: {
                        width: 380,
                    },
                },
            },
            {
                breakpoint: 640,
                options: {
                    chart: {
                        width: 200,
                    },
                },
            },
        ],
    };

    return (
        <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
            <div className="mb-3 justify-between gap-4 sm:flex">
                <div>
                    <h5 className="text-xl font-semibold text-black dark:text-white">
                        5 Motivos de consulta más comunes
                    </h5>
                </div>
            </div>

            <div className="mb-2">
                <div id="chartThree" className="mx-auto flex justify-center">
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="donut"
                    />
                </div>
            </div>

            <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                {data.map((item, index) => (
                    <div key={index} className="sm:w-1/2 w-full px-8">
                        <div className="flex w-full items-center">
                            <span className={`mr-2 block h-3 w-full max-w-3 rounded-full`} style={{ backgroundColor: options.colors![index] }}></span>
                            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                <span>{item.motivo} ({((item.numeroDeVeces / series.reduce((a, b) => a + b, 0)) * 100).toFixed(2)}%)</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChartMostCommonDiseases;
