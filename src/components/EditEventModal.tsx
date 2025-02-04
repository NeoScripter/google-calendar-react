import { format } from 'date-fns';
import { useEvents } from './../hooks/EventHandler';
import { useState } from 'react';
import { EventType } from '../types';

type editEventModalType = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    date: Date;
    event: EventType;
};

export function EditEventModal({ setShowModal, date, event }: editEventModalType) {
    const { editEvent, deleteEvent } = useEvents();

    const [name, setName] = useState(event.name);
    const [submitted, setSubmitted] = useState(false);

    const [color, setColor] = useState(event.color);
    const [endTime, setEndTime] = useState(event.endTime);
    const [startTime, setStartTime] = useState(event.startTime);
    const [checked, setChecked] = useState(event.allDay);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setSubmitted(true);

        if (name === '') return;
        if (checked === false && endTime === '') return
        if (checked === false && startTime === '') return
        if (checked === false && endTime < startTime) return

        const newEvent = {id: event.id, name, allDay: checked, startTime, endTime, color};
        
        editEvent({date, event: newEvent});
        setShowModal(false);
    }

    function handleDelete() {
        deleteEvent({date, id: event.id});
        setShowModal(false);
    }

    function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            setStartTime('');
            setEndTime('');
        }
        setChecked(e.target.checked)
    }

    return (
        <div className="modal">
            <div className="overlay"></div>
            <div className="modal-body">
                <div className="modal-title">
                    <div>Edit Event</div>
                    <small>{format(date, 'M/d/yy')}</small>
                    <button
                        onClick={() => setShowModal(false)}
                        className="close-btn"
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={`form-group ${submitted && name === '' ? 'error' : ''}`}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        {submitted && name === '' && (<p className="form-error">Required</p>)}
                    </div>
                    <div className="form-group checkbox">
                        <input
                            type="checkbox"
                            name="all-day"
                            id="all-day"
                            checked={checked}
                            onChange={handleCheck}
                        />
                        <label htmlFor="all-day">All Day?</label>
                    </div>
                    <div className="row">
                        <div className={`form-group ${submitted && checked === false && startTime === '' ? 'error' : ''}`}>
                            <label htmlFor="start-time">Start Time</label>
                            <input
                                disabled={checked}
                                type="time"
                                name="start-time"
                                id="start-time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                              {submitted && checked === false && startTime === '' && (<p className="form-error">Required</p>)}
                        </div>
                        <div className={`form-group ${submitted && checked === false && (endTime === '' || endTime < startTime) ? 'error' : ''}`}>
                            <label htmlFor="end-time">End Time</label>
                            <input
                                disabled={checked}
                                type="time"
                                name="end-time"
                                id="end-time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                                {submitted && checked === false && endTime === '' && (<p className="form-error">Required</p>)}
                                {submitted && checked === false && endTime < startTime && (<p className="form-error">Must be after start time</p>)}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Color</label>
                        <div className="row left">
                            <input
                                type="radio"
                                name="color"
                                value="blue"
                                id="blue"
                                className="color-radio"
                                checked={color === 'blue'}
                                onChange={(e) => setColor(e.target.value)}
                            />
                            <label htmlFor="blue">
                                <span className="sr-only">Blue</span>
                            </label>
                            <input
                                type="radio"
                                name="color"
                                value="red"
                                id="red"
                                className="color-radio"
                                checked={color === 'red'}
                                onChange={(e) => setColor(e.target.value)}
                            />
                            <label htmlFor="red">
                                <span className="sr-only">Red</span>
                            </label>
                            <input
                                type="radio"
                                name="color"
                                id="green"
                                value="green"
                                className="color-radio"
                                checked={color === 'green'}
                                onChange={(e) => setColor(e.target.value)}
                            />
                            <label htmlFor="green">
                                <span className="sr-only">Green</span>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn btn-success" type="submit">
                            Edit
                        </button>
                        <button onClick={handleDelete} className="btn btn-delete" type="button">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
