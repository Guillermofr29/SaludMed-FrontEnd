import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarAppointments from '../Calendar/Calendar';
import { Appointments } from '../../interfaces/Appointments/Appointments';

interface Props {
    appointments: Appointments[];
}

const CalendarWrapper: React.FC<Props> = ({ appointments }) => {
    const [isCalendarLoaded, setIsCalendarLoaded] = useState(false);

    useEffect(() => {
        setIsCalendarLoaded(true);
    }, []);

    if (!isCalendarLoaded) {
        return <div>Cargando calendario...</div>;
    }

    return <CalendarAppointments appointments={appointments} />;
};

export default CalendarWrapper;