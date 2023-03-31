function Countdown({ timeLeft, startTimer, stopTimer, isCounterRunning }) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>{timeLeft} seconds left</h1>
      <div className="d-flex gap-2">
        <button
          disabled={isCounterRunning}
          type="button"
          className={`btn btn-primary ${
            isCounterRunning ? "btn-secondary" : "btn-primary"
          }`}
          onClick={startTimer}
        >
          Start
        </button>
        <button
          disabled={!isCounterRunning}
          type="button"
          className={`btn btn-dark ${
            isCounterRunning ? "btn-secondary" : "btn-dark"
          }`}
          onClick={stopTimer}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
export default Countdown;
