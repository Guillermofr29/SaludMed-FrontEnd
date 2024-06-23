import React, { ReactNode } from 'react';

interface CardDashboardI {
    title: string;
    total: number;
    rate?: string;
    levelUp?: boolean;
    levelDown?: boolean;
    Classnames?: string;
    borderRadius?: string;
    borderRadiusTop?: string;
    test?: string;
    children: ReactNode;
}

const CardDashboard: React.FC<CardDashboardI> = ({
    title,
    total,
    Classnames,
    borderRadius,
    borderRadiusTop,
    test,
    children,
}) => {
    return (
        <div className={`rounded-10 text-center border border-stroke pb-6 shadow-default dark:border-strokedark ${borderRadius} ${Classnames}`} >
            <div className={`${test} ${borderRadiusTop} py-4`}>
                <h1 className="text-title-sm font bold text-white text-center font-medium">{title}</h1>
            </div>
            <div className='text-white pt-5'>
                {children}
            </div>

            <div className="mt-4 items-end justify-between">
                <div className="flex items-center justify-center">
                    <h4 className="text-title-md text-white dark:text-white">
                        {total}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default CardDashboard;
