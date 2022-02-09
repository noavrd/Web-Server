import { useState } from 'react';
import axios from 'axios';
import '../styles/addTask.css';

export default function AddTask({ setChanged }) {
  const BASE_URL = 'http://localhost:8080';

  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');

  // Add new task
  const clickHandler = () => {
    //Do this on backend
    if (newTask === '') {
      setError('Please Enter A Task');
      return;
    }

    axios
      .post(`${BASE_URL}/add`, { title: newTask })
      .then(() => {
        console.log('Added Successfully');
        setNewTask('');
        setError('');
        setChanged(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="add-task">
        <input
          className="add-task-input"
          // placeholder="Enter New Task"
          onChange={(e) => {
            newTask === '' &&
              (e.target.value = e.target.value.charAt(0).toUpperCase());
            setNewTask(e.target.value);
          }}
          value={newTask}
          onKeyPress={(e) => e.key === 'Enter' && clickHandler()}
        />
        <button className="add-task-btn" onClick={() => clickHandler()}>
          +
        </button>
      </div>
      <div>{error}</div>
    </>
  );
}
