import { Callback } from "./types";

const throttle = <T extends unknown[]>(cb: Callback<T>, delay: number = 100): Callback<T> => {
    let shouldWait = false;
    let waitingArgs: T | null;

    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false;
        } else {
            cb(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
    };

    return (...args: T) => {
        if (shouldWait) {
            waitingArgs = args;
            return;
        }

        cb(...args);
        shouldWait = true;

        setTimeout(timeoutFunc, delay);
    };
};

export default throttle;