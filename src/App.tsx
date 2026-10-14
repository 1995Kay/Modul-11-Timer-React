// @ts-expect-error
import "./App.css";
import React, { useEffect, useRef, useState } from "react";

function useFormInput(initialValue: number) {
  const [value, setValue] = React.useState<number>(0);

  function handleInputChangeEvent(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value));
  }

  return {
    value,
    handleInputChangeEvent,
  };
}

function App() {
  const { value, handleInputChangeEvent } = useFormInput(0);
  const [startTime, setStartTime] = React.useState(0);
  const [now, setNow] = React.useState(0);
  const [pause, setPause] = useState(false);
  const intervalId = useRef(-1);

  useEffect(() => {
    if ((now - startTime) / 1000 >= value) {
      clearInterval(intervalId.current);
      setNow(startTime + value * 1000);
    }
  }, [startTime, now, value]);
  function startInterval() {
    intervalId.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStart() {
    const dateNow = Date.now();

    if (!pause) {
      setStartTime(dateNow);
      setNow(dateNow);
    } else {
      const elapsedTime = now - startTime;
      setNow(dateNow);
      setStartTime(dateNow - elapsedTime);
    }

    setPause(false);
    clearInterval(intervalId.current);
    startInterval();
  }

  function handlePaus() {
    clearInterval(intervalId.current);
    setPause(true);
  }

  function handleRest() {
    clearInterval(intervalId.current);
    setPause(false);
    setStartTime(0);
    setNow(0);
  }

  const secondsLeft = value - (now - startTime) / 1000;

  return (
    <div>
      <span className="form-label-1">Zeit festlegen</span>
      <br />
      <input
        className="form-input"
        type="number"
        value={value}
        onChange={handleInputChangeEvent}
      ></input>
      <br />
      <span className="form-label-2">Time left</span>
      <span className="form-value">{secondsLeft.toFixed(3)}</span>
      <div className="button-container">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePaus}>Stop</button>
        <button onClick={handleRest}>Reset</button>
      </div>
    </div>
  );
}
export default App;
