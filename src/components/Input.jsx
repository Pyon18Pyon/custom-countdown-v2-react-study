import React, { useState, useEffect } from 'react';
import './Input.css';

// Set Date Input Min with Today's Date so that a user cannot select past dates
const today = new Date().toISOString().split('T')[0];

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let tick;
let distance = 0;

function Input() {

  const [userInput, setUserInput] = useState({
    title: '',
    date: ''
  });

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate days, hours, minutes and seconds
  const calculateTimeLeft = () => {
    if (userInput.date) {
      // Get the current time
      const currentTime = new Date().getTime();
      console.log('currentTime:', currentTime);

      // Get the user input time
      const countdownValue = new Date(userInput.date).getTime();
      console.log('countdownValue:', countdownValue);

      // Get the time remaining until the countdown date
      distance = countdownValue - currentTime;

      const days = Math.floor(distance / day);
      const hours = Math.floor((distance % day) / hour);
      const minutes = Math.floor((distance % hour) / minute);
      const seconds = Math.floor((distance % minute) / second);

      // Set the setTime state to each new time
      setTime({ days: days, hours: hours, minutes: minutes, seconds: seconds });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    setUserInput({
      title: event.target[0].value,
      date: event.target[1].value
    });
  };

  useEffect(() => {
    if (userInput.date) {
      localStorage.setItem('countdown', JSON.stringify(userInput));
    }
    tick = setInterval(() => calculateTimeLeft(), second);
  }, [userInput]);

  console.log(time);

  const handleClick = () => {
    clearInterval(tick);
    setUserInput({
      title: '',
      date: ''
    });
    setTime({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    distance = 0;
    localStorage.removeItem('countdown');
  };

  // Clear Interval
  useEffect(() => {
    if (distance < 0) {
      clearInterval(tick);
    }
  });

  console.log('distance:', distance);

  // Restore Previous Countdown
  useEffect(() => {
    // Get countdown from localStorage if available
    if (localStorage.getItem('countdown')) {
      setUserInput(JSON.parse(localStorage.getItem('countdown')));
    }
  }, []);


  return (
    <div>
      {/* Container */}
      <div className="container">
        {/* Input */}
        <div className="input-container" hidden={userInput.date !== '' ? true : false}>
          <h1>Create a Custom Countdown!</h1>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" placeholder="What are you counting down to?" />
            <label htmlFor="date-picker">Select a Date</label>
            <input type="date" min={today} />
            <button type="submit">Submit</button>
          </form>
        </div>
        {/* Countdown  */}
        <div className="countdown" id="countdown" hidden={userInput.date === '' || distance < 0 ? true : false}>
          <h1>{userInput.title}</h1>
          <ul>
            <li><span>{time.days}</span>Days</li>
            <li><span>{time.hours}</span>Hours</li>
            <li><span>{time.minutes}</span>Minutes</li>
            <li><span>{time.seconds}</span>Seconds</li>
          </ul>
          <button onClick={handleClick}>Reset</button>
        </div>
        {/* Complete */}
        <div className="complete" hidden={distance >= 0 ? true : false}>
          <h1 className="complete-title">Countdown Complete!</h1>
          <h1>{`${userInput.title} finished on ${userInput.date}`}</h1>
          <button onClick={handleClick}>New Countdown</button>
        </div>



      </div>
    </div>

  );
}

export default Input;