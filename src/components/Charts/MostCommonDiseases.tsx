import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartMostCommonDiseasesI {
    series: number[];
}

const options: ApexOptions = {
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'donut',
    },
    colors: ['#9774E2', '#6577F3', '#FF7474', '#C20097', '#00AA11'],
    labels: ['Infecciones por respiración', 'Infecciones de vías urinarias', 'Infecciones gastrointestinales', 'Hipertensión arterial', 'Úlceras gastritis y dudodenitis'],
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

const ChartMostCommonDiseases: React.FC = () => {
    const [state, setState] = useState<ChartMostCommonDiseasesI>({
        series: [12, 34, 12, 56, 24],
    });

    const handleReset = () => {
        setState((prevState) => ({
            ...prevState,
            series: [12, 34, 12, 56, 24],
        }));
    };
    handleReset;

    return (
        <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
            <div className="mb-3 justify-between gap-4 sm:flex">
                <div>
                    <h5 className="text-xl font-semibold text-black dark:text-white">
                        Enfermedades más comunes
                    </h5>
                </div>
            </div>

            <div className="mb-2">
                <div id="chartThree" className="mx-auto flex justify-center">
                    <ReactApexChart
                        options={options}
                        series={state.series}
                        type="donut"
                    />
                </div>
            </div>

            <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                <div className="sm:w-1/2 w-full px-8">
                    <div className="flex w-full items-center">
                        <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#9774E2]"></span>
                        <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                            <span> Infecciones por respiración </span>
                            <span> 12% </span>
                        </p>
                    </div>
                </div>
                <div className="sm:w-1/2 w-full px-8">
                    <div className="flex w-full items-center">
                        <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
                        <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                            <span> Infecciones de vías urinarias </span>
                            <span> 34% </span>
                        </p>
                    </div>
                </div>
                <div className="sm:w-1/2 w-full px-8">
                    <div className="flex w-full items-center">
                        <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#FF7474]"></span>
                        <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                            <span> Infecciones gastrointestinales </span>
                            <span> 12% </span>
                        </p>
                    </div>
                </div>
                <div className="sm:w-1/2 w-full px-8">
                    <div className="flex w-full items-center">
                        <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#C20097]"></span>
                        <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                            <span> Hipertensión arterial </span>
                            <span> 56% </span>
                        </p>
                    </div>
                </div>
                <div className="sm:w-1/2 w-full px-8">
                    <div className="flex w-full items-center">
                        <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#00AA11]"></span>
                        <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                            <span> Úlceras gastritis y dudodenitis </span>
                            <span> 24% </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartMostCommonDiseases;
