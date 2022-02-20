import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTask from './AddTask';
import SingleTask from './SingleTask';
export default function Main() {
  const BASE_URL = 'http://localhost:8080';
  const [tasks, setTasks] = useState([]);
  const [changed, setChanged] = useState(false);

  const getData = () => {
    axios
      .get(`${BASE_URL}/allTitles`)
      .then((result) => setTasks(result.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(tasks);

  useEffect(() => {
    if (changed) {
      getData();
      setChanged(false);
    }
  }, [changed]);

  return (
    <div className="total">
      <div className="block">
        <h1>To Do:</h1>
        <AddTask setChanged={setChanged} />
      </div>
      <div className="space"></div>
      <div className="all-tasks">
        {tasks.map((task, i) => (
          <SingleTask
            title={task.title}
            id={task._id}
            setChanged={setChanged}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
