import { format } from 'date-fns';
import { EventType } from '../types';
import { Event } from './Event';

export function FullEventsModal({
    setShowModal,
    date,
    dayEvents
}: {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    date: Date;
    dayEvents: EventType[];
}) {
    return (
        <div className="modal">
            <div className="overlay"></div>
            <div className="modal-body">
                <div className="modal-title">
                    {format(date, 'M/d/yy')}
                    <button onClick={() => setShowModal(false)} className="close-btn">&times;</button>
                </div>
                <div className="events">
                    {dayEvents.map((event) => (
                        <Event key={event.id} event={event} date={date} />
                    ))}
                </div>
            </div>
        </div>
    );
}
