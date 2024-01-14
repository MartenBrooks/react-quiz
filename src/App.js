import { useEffect, useReducer } from 'react';
import Header from './Header.js';
import Main from './Main.js';

const initialState = {
  questions: [],
  // loadind, error, ready, active, finished
  status: '',
};
function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved': {
      return { ...state, questions: action.payload, status: 'ready' };
    }
    case 'gotError': {
      return { ...state, status: 'error' };
    }
    default: {
      throw new Error('Action is unknown');
    }
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch('http://localhost:8000/questions');

        if (!res.ok) {
          throw new Error('Trouble connecting');
        }

        const data = await res.json();
        dispatch({ type: 'dataRecieved', payload: data, status: 'ready' });
      } catch (err) {
        dispatch({ type: 'gotError', status: 'error' });
        console.error(err.message);
      }
    }
    getData();
  }, []);
  console.log(state);
  const { questions, status } = state;
  console.log(state);
  return (
    <div className="app">
      <Header />
      {status === 'loading' ? (
        <p>Loading</p>
      ) : (
        <Main>
          <p>1/15</p>
          <p>Question</p>
        </Main>
      )}
    </div>
  );
}

export default App;
