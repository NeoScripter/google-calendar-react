import { useEffect, useState } from 'react';
import { EventDataType } from '../types';

export function useLocalStorage(
    key: string,
    initialValue: EventDataType
): [EventDataType, React.Dispatch<React.SetStateAction<EventDataType>>] {
    const [value, setValue] = useState<EventDataType>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue !== null) {
            try {
                const parsed = JSON.parse(jsonValue);
                return new Map(parsed) as EventDataType;
            } catch {
                return initialValue;
            }
        }
        return initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify([...value]));
    }, [value, key]);

    return [value, setValue];
}
