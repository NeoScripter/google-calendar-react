import { addDays, startOfDay } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { EventDataType } from './types';

const today = startOfDay(new Date());
const tomorrow = startOfDay(addDays(today, 1));
const dayAfterTomorrow = startOfDay(addDays(today, 2));

export const dummyEvents: EventDataType = new Map([
    [
        today.toDateString(),
        [
            {
                id: uuidv4(),
                name: 'Morning Meeting',
                allDay: false,
                startTime: '09:00', // 9 AM
                endTime: '10:00', // 10 AM
                color: 'blue'
            },
            {
                id: uuidv4(),
                name: 'Lunch Break',
                allDay: false,
                startTime: '12:00', // 12 PM
                endTime: '13:00', // 1 PM
                color: 'green'
            }
        ]
    ],
    [
        tomorrow.toDateString(),
        [
            {
                id: uuidv4(),
                name: 'Project Review',
                allDay: false,
                startTime: '14:00', // 2 PM
                endTime: '15:00', // 3 PM
                color: 'red'
            },
            {
                id: uuidv4(),
                name: 'Workout',
                allDay: false,
                startTime: '18:00', // 6 PM
                endTime: '19:00', // 7 PM
                color: 'blue'
            }
        ]
    ],
    [
        dayAfterTomorrow.toDateString(),
        [
            {
                id: uuidv4(),
                name: 'Full-day Conference',
                allDay: true,
                startTime: '',
                endTime: '',
                color: 'red'
            },
            {
                id: uuidv4(),
                name: 'Dinner with Friends',
                allDay: false,
                startTime: '20:00',
                endTime: '22:00', // 10 PM
                color: 'blue'
            }
        ]
    ]
]);
