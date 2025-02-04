import { format, isSameDay, startOfDay } from 'date-fns';
import { useEvents } from './../hooks/EventHandler';
import { Events } from './Events';
import { AddEventModal } from './AddEventModal';
import { createPortal } from 'react-dom';
import { useState } from 'react';

type DayProps = {
    date: Date;
    isCurrentMonth: boolean;
    isOldMonthDay: boolean;
};

export function Day({ date, isCurrentMonth, isOldMonthDay }: DayProps) {
    const { events } = useEvents();
    const [showModal, setShowModal] = useState(false);

    return (
        <div
            className={`day ${isCurrentMonth ? '' : 'non-month-day'} ${
                isOldMonthDay ? 'old-month-day' : ''
            }`}
        >
            <div className="day-header">
                <div className="week-name">{format(date, 'E')}</div>
                <div
                    className={`day-number ${
                        isSameDay(date, new Date()) && 'today'
                    }`}
                >
                    {format(date, 'd')}
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="add-event-btn"
                >
                    +
                </button>
            </div>
            {events.has(startOfDay(date).toDateString()) && (
                <Events date={startOfDay(date)} />
            )}
            {showModal &&
                createPortal(
                    <AddEventModal setShowModal={setShowModal} date={date} />,
                    document.getElementById('modal-container')!
                )}
        </div>
    );
}
