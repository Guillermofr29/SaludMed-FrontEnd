import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartQuantityBySexI {
    series: {
        name: string;
        data: number[];
    }[];
}

const ChartQuantityBySex: React.FC = () => {
    const [state, setState] = useState<ChartQuantityBySexI>({
        series: [
            {
                name: 'Masculino',
                data: [44],
            },
            {
                name: 'Femenino',
                data: [55],
            },
        ],
    });

    const updateData = () => {
        const newData = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
        setState({
            series: [
                {
                    name: 'Masculino',
                    data: [newData[0]],
                },
                {
                    name: 'Femenino',
                    data: [newData[1]],
                },
            ],
        });
    };

    const options: ApexOptions = {
        chart: {
            fontFamily: 'Satoshi, sans-serif',
            type: 'bar',
            height: 350,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 10,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: ['Sexo'],
        },
        yaxis: {
            title: {
                text: 'Cantidad',
            },
        },
        fill: {
            opacity: 1,
            colors: ['#7EB9FF', '#FF7EFA'],
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val.toString();
                },
            },
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
                        Cantidad por Sexo
                    </h5>
                </div>
                <button
                    onClick={updateData}
                    className="mt-3 sm:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Actualizar Datos
                </button>
            </div>

            <div className="mb-2">
                <div id="chartBar" className="mx-auto flex justify-center">
                    <ReactApexChart
                        options={options}
                        series={state.series}
                        type="bar"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartQuantityBySex;
