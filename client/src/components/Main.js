import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTask from './AddTask';
export default function Main() {
  const BASE_URL = 'http://localhost:8080';
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/allTitles`)
      .then((result) => setTasks(result.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(tasks);
  return (
    <div>
      <h1>Tasks</h1>
      <AddTask />
    </div>
  );
}
