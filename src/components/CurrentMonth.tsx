import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    isBefore,
    isSameMonth,
    startOfDay,
    startOfMonth,
    startOfWeek
} from 'date-fns';
import { Day } from './Day';
import { EventHandler } from './../hooks/EventHandler';
import { useMemo } from 'react';

type CurrentMonthType = {
    currentMonth: Date;
};

export function CurrentMonth({ currentMonth }: CurrentMonthType) {

    const visibleDates = useMemo(() => {
        return eachDayOfInterval({
            start: startOfWeek(startOfMonth(currentMonth)),
            end: endOfWeek(endOfMonth(currentMonth))
        })
    }, [currentMonth]);

    return (
        <EventHandler>
            <div className="days">
                {visibleDates.map((date) => (
                    <Day
                        key={date.toDateString()}
                        date={date}
                        isCurrentMonth={isSameMonth(date, currentMonth)}
                        isOldMonthDay={isBefore(
                            startOfDay(date),
                            startOfDay(new Date())
                        )}
                    />
                ))}
            </div>
        </EventHandler>
    );
}
