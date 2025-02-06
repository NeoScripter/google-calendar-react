import { startOfDay } from 'date-fns';
import { Event } from './Event';
import { useEvents } from './../hooks/EventHandler';
import { useCallback, useLayoutEffect, useState } from 'react';
import throttle from '../utils';
import { createPortal } from 'react-dom';
import { FullEventsModal } from './FullEventsModal';

const FIELDHEIGHT = 22.8;
const GAP = 8;

export function Events({ date }: { date: Date }) {
    const { events } = useEvents();
    const [overflown, setOverflown] = useState(0);
    const [screenSize, setScreenSize] = useState({
        width: window.innerHeight,
        height: window.innerWidth
    });
    const [showModal, setShowModal] = useState(false);

    const dayEvents = events.get(startOfDay(date).toDateString());

    const handleResize = useCallback(
        throttle(() => {
            setScreenSize({
                width: window.innerHeight,
                height: window.innerWidth
            });
        }, 500),
        []
    );

    useLayoutEffect(() => {
        if (dayEvents) {
            const eventContainerHeight =
                document.querySelector('.events')?.clientHeight || 0;
            const fieldGapHeight = FIELDHEIGHT + GAP;
            const maxFit = Math.floor(eventContainerHeight / fieldGapHeight);

            const allEvents = dayEvents.length;
            if (allEvents > maxFit) {
                setOverflown(allEvents - maxFit);
            }
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dayEvents, date, screenSize, handleResize]);

    return (
        <div className="events">
            {dayEvents?.map((event, idx) =>
                idx < dayEvents.length - overflown ? (
                    <Event key={event.id} event={event} date={date} />
                ) : null
            )}
            {overflown > 0 && (
                <button onClick={() => setShowModal(true)} className="events-view-more-btn">+{overflown}</button>
            )}
            {overflown > 0 && showModal && dayEvents &&
                createPortal(
                    <FullEventsModal setShowModal={setShowModal} date={date} dayEvents={dayEvents} />,
                    document.getElementById('modal-container')!
                )}
        </div>
    );
}
