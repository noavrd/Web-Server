import axios from 'axios';
import { useEffect, useState } from 'react';

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
    axios
      .put(`${BASE_URL}/updateTitle`, { _id: id, title: inputValue })
      .then(() => {
        setUpdate(false);
        setChanged(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  return (
    <div>
      {!update ? (
        <div>
          <span>{title}</span>
          <i className="fa fa-trash-o" onClick={() => deleteHandler()}></i>
          <i className="fas fa-pencil-alt" onClick={() => setUpdate(true)}></i>
        </div>
      ) : (
        <div>
          <input
            value={inputValue}
            onChange={(e) => {
              inputValue === '' &&
                (e.target.value = e.target.value.charAt(0).toUpperCase());
              setInputValue(e.target.value);
            }}
          />
          <i
            className="fa-solid fa-floppy-disk"
            onClick={() => updateHandler()}></i>{' '}
          <i className="fa-solid fa-x" onClick={() => setUpdate(false)}></i>
        </div>
      )}
    </div>
  );
}
