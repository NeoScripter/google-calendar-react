import { useState } from 'react';
import { EditEventModal } from './EditEventModal';
import { createPortal } from 'react-dom';
import { EventType } from '../types';

export function Event({ event, date }: {event: EventType, date: Date}) {
    const [showModal, setShowModal] = useState(false);

    function handleClick() {
        setShowModal(true);
    }

    return (
        <>
            {event.allDay ? (
                <button onClick={handleClick} className={`all-day-event event ${event.color}`}>
                    <div className="event-name">{event.name}</div>
                </button>
            ) : (
                <button onClick={handleClick} className="event">
                    <div className={`color-dot ${event.color}`}></div>
                    <div className="event-time">{event.startTime}</div>
                    <div className="event-name">{event.name}</div>
                </button>
            )}
            {showModal &&
                createPortal(
                    <EditEventModal setShowModal={setShowModal} date={date} event={event} />,
                    document.getElementById('modal-container')!
                )}
        </>
    );
}
