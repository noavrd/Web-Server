import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTask from './AddTask';
import SingleTask from './SingleTask';
export default function Main() {
  const BASE_URL = 'http://localhost:8080';
  const [tasks, setTasks] = useState([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/allTitles`)
      .then((result) => setTasks(result.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(tasks);

  useEffect(() => {
    if (changed) {
      axios
        .get(`${BASE_URL}/allTitles`)
        .then((result) => setTasks(result.data))
        .catch((err) => console.log(err));
      setChanged(false);
    }
  }, [changed]);
  return (
    <div>
      <h1>What is your focus for today?</h1>
      <AddTask setChanged={setChanged} />
      {tasks.map((task, i) => (
        <SingleTask
          title={task.title}
          id={task._id}
          setChanged={setChanged}
          key={i}
        />
      ))}
    </div>
  );
}
