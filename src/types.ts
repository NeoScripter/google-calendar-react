
export type EventType = {
    id: string;
    name: string;
    allDay: boolean;
    startTime: string;
    endTime: string;
    color: string;
};

export type EventDataType = Map<string, EventType[]>;

export type Callback<T extends unknown[]> = (...args: T) => void;