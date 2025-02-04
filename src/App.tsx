import { useState } from 'react';
import { CurrentMonth } from './components/CurrentMonth';
import {
  addMonths,
  format
} from "date-fns"

function App() {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    function showPreviousMonth() {
      setCurrentMonth(currentMonth => {
        return addMonths(currentMonth, -1)
      })
    }
  
    function showNextMonth() {
      setCurrentMonth(currentMonth => {
        return addMonths(currentMonth, 1)
      })
    }

    return (
        <>
            <div className="calendar">
                <div className="header">
                    <button onClick={() => setCurrentMonth(new Date())} className="btn">Today</button>
                    <div>
                        <button onClick={showPreviousMonth} className="month-change-btn">&lt;</button>
                        <button onClick={showNextMonth} className="month-change-btn">&gt;</button>
                    </div>
                    <span className="month-title">{format(currentMonth, 'MMMM - y')}</span>
                </div>

                <CurrentMonth currentMonth={currentMonth} />
            </div>
        </>
    );
}

export default App;
