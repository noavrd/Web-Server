import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/task.css';
export default function SingleTask({ title, id, setChanged }) {
  const [update, setUpdate] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const BASE_URL = 'http://localhost:8080';

  const deleteHandler = () => {
    axios
      .delete(`${BASE_URL}/deleteTitle`, { data: { _id: id } })
      .then(() => {
        console.log('Deleted successfully');
        setChanged(true);
      })
      .catch((err) => console.log(err));
  };

  const updateHandler = () => {
    // Check if input value is only spaces / empty
    if (inputValue.trim().length !== 0) {
      axios
        .put(`${BASE_URL}/updateTitle`, { _id: id, title: inputValue })
        .then(() => {
          setChanged(true);
        })
        .catch((err) => console.log(err));
    } else {
      setInputValue(title);
    }

    // Remove display from edit
    setUpdate(false);
  };

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  return (
    <div>
      {!update ? (
        <div className="single-task">
          <span>{title}</span>
          <span>
            <i
              className="fa fa-trash-o click"
              onClick={() => deleteHandler()}></i>{' '}
            <i
              className="fas fa-pencil-alt click"
              onClick={() => setUpdate(true)}></i>
          </span>
        </div>
      ) : (
        <div className="single-task edit">
          <input
            autoFocus
            className="single-input"
            value={inputValue}
            onChange={(e) => {
              inputValue === '' &&
                (e.target.value = e.target.value.charAt(0).toUpperCase());
              setInputValue(e.target.value);
            }}
            onKeyPress={(e) => e.key === 'Enter' && updateHandler()}
          />
          <span>
            <i
              className="fa-solid fa-floppy-disk click"
              onClick={() => updateHandler()}></i>{' '}
            <i
              className="fa-solid fa-x click"
              onClick={() => setUpdate(false)}></i>
          </span>
        </div>
      )}
    </div>
  );
}
