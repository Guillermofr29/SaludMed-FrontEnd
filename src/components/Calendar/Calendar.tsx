import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Appointments } from '../../interfaces/Appointments/Appointments';

interface Props {
    appointments: Appointments[];
}

const CalendarAppointments: React.FC<Props> = ({ appointments }) => {
    const today = new Date();

    const tileClassName = ({ date }: { date: Date }) => {
        const formattedDate = date.toISOString().slice(0, 10);

        const appointment = appointments.find((appt: Appointments) => appt.fecha === formattedDate);

        if (appointment) {
            switch (appointment.estatus) {
                case 'Terminada':
                    return 'border bg-success text-white rounded-full';
                case 'Pendiente':
                    return 'border bg-warning text-white rounded-full';
                case 'Cancelada':
                    return 'border bg-danger text-white rounded-full';
                default:
                    return '';
            }
        }

        if (date.toDateString() === today.toDateString()) {
            return 'border border-gray';
        }

        return '';
    };

    return (
        <div className="p-4 dark:bg-boxdark rounded-lg">
            <Calendar
                value={today}
                defaultView="month"
                prev2Label={null}
                next2Label={null}
                tileClassName={tileClassName}
                className="mt-4 border-none dark:bg-boxdark border-gray-600"
            />
        </div>
    );
};

export default CalendarAppointments;