import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  const mapping = {
    dec: () => ({ ...state, count: state.count - Number(action.payload) }),
    inc: () => ({ ...state, count: state.count + Number(action.payload) }),
    setCount: () => ({ ...state, count: Number(action.payload) }),
    setStep: () => ({ ...state, step: Number(action.payload) }),
    reset: () => initialState,
  };
  return mapping[action.type]();
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    dispatch({ type: 'dec', payload: step });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    dispatch({ type: 'inc', payload: step });
  };

  const defineCount = function (e) {
    dispatch({ type: 'setCount', payload: e.target.value });
  };

  const defineStep = function (e) {
    dispatch({ type: 'setStep', payload: e.target.value });
  };

  const reset = function () {
    dispatch({ type: 'reset' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input
          value={count}
          onChange={defineCount}
        />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
