import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axiosInstance from '../../api/axiosConfig';

const ChartQuantityBySex: React.FC = () => {
    const MedicoID = localStorage.getItem('userId') || 'Id';
    const [state, setState] = useState<{ mujeres: number; hombres: number }>({ mujeres: 0, hombres: 0 });

    useEffect(() => {
        const fetchGenderData = async () => {
            try {
                const response = await axiosInstance.get(`Paciente/ContarGeneroPacientes?medicoID=${MedicoID}`);
                setState({
                    mujeres: response.data.mujeres,
                    hombres: response.data.hombres,
                });
            } catch (err) {
                console.error('Error fetching gender data:', err);
            }
        };

        fetchGenderData();
    }, [MedicoID]);

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

    const series = [
        { name: 'Masculino', data: [state.hombres], colors: '#7EB9FF' },
        { name: 'Femenino', data: [state.mujeres], colors: '#FF7EFA' },
    ];

    return (
        <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
            <div className="mb-3 justify-between gap-4 sm:flex">
                <div>
                    <h5 className="text-xl font-semibold text-black dark:text-white">Cantidad por Sexo</h5>
                </div>
            </div>

            <div className="mb-2">
                <div id="chartBar" className="mx-auto flex justify-center">
                    <ReactApexChart options={options} series={series} type="bar" height={350} />
                </div>
            </div>
        </div>
    );
};

export default ChartQuantityBySex;
