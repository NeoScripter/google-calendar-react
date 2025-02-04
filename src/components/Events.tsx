import { startOfDay } from 'date-fns';
import { Event } from './Event';
import { useEvents } from './../hooks/EventHandler';

export function Events({ date }: { date: Date }) {
    const { events } = useEvents();

    const dayEvents = events.get(startOfDay(date).toDateString());

    return (
        <div className="events">
            {dayEvents?.map((event) => (
                <Event key={event.id} event={event} date={date} />
            ))}
        </div>
    );
}
