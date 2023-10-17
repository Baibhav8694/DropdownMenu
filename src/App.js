import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setJsonData } from './redux/locationSlice';
import Dropdown from './components/Dropdown';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`./task.json?_=${new Date().getTime()}`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log actual data, not the promise
        dispatch(setJsonData(data));
      })
      .catch(error => {
        console.log("Error fetching the JSON:", error);
      });
  }, [dispatch]);

  return (
    <div className="App">
      <Dropdown />
    </div>
  );
}

export default App;
