import { createContext, useContext, ReactNode } from 'react';
import { dummyEvents } from '../DummyEvents';
import { startOfDay } from 'date-fns';
import { EventType, EventDataType } from '../types';
import { useLocalStorage } from './useLocalStorage';

type EventContextType = {
    events: EventDataType;
    addEvent: ({ date, event }: { date: Date; event: EventType }) => void;
    editEvent: ({ date, event }: { date: Date; event: EventType }) => void;
    deleteEvent: ({ date, id }: { date: Date; id: string }) => void;
};

export const EventsContext = createContext<EventContextType | null>(null);

export function useEvents() {
    const eventsContext = useContext(EventsContext);

    if (eventsContext == null) {
        throw new Error('useEvents must be used within an EventHandler');
    }

    return eventsContext;
}

export function EventHandler({ children }: { children: ReactNode }) {
    const [events, setEvents] = useLocalStorage('calendarEvents', dummyEvents);

    const addEvent = ({ date, event }: { date: Date; event: EventType }) => {
        setEvents((prevEvents: EventDataType) => {
            const key = startOfDay(date).toDateString();
            const dateEvents = prevEvents.get(key) || [];

            const newEvents = [...dateEvents, { ...event }];
            
            const updatedEvents = new Map(prevEvents);
            updatedEvents.set(key, sortEvents(newEvents)); 

            return updatedEvents;
        });
    };

    const editEvent = ({ date, event }: { date: Date; event: EventType }) => {
        setEvents((prevEvents: EventDataType) => {
            const key = startOfDay(date).toDateString();
            const dateEvents = prevEvents.get(key);

            if (dateEvents == null) {
                throw new Error('Could not find the events for that day');
            }

            const newEvents = dateEvents.map((prevEvent) => {
                if (prevEvent.id === event.id) {
                    return { ...event };
                }
                return prevEvent;
            });

            const updatedEvents = new Map(prevEvents);
            updatedEvents.set(key, sortEvents(newEvents)); 

            return updatedEvents;
        });
    };

    const deleteEvent = ({ date, id }: { date: Date; id: string }) => {
        setEvents((prevEvents: EventDataType) => {
            const key = startOfDay(date).toDateString();
            const dateEvents = prevEvents.get(key);

            if (dateEvents == null) {
                throw new Error('Could not find the events for that day');
            }

            const newEvents = dateEvents.filter((prevEvent) => prevEvent.id !== id);

            const updatedEvents = new Map(prevEvents);
            updatedEvents.set(key, newEvents); 

            return updatedEvents;
        });
    };

    return (
        <EventsContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
            {children}
        </EventsContext.Provider>
    );
}


function sortEvents(events: EventType[]): EventType[] {
    return events.sort((a, b) => {
        if (a.allDay && !b.allDay) return -1;
        if (!a.allDay && b.allDay) return 1;

        return a.startTime.localeCompare(b.startTime);
    });
}