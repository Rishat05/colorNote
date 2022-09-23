import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import NoteCard from './NoteCard';

function App() {

  const [notes, setNotes] = useState([]);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/note")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, [isReload])

  const handleDelete = id => {
    fetch(`http://localhost:5000/note/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsReload(!isReload);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var text = e.target.name.value;
    e.target.name.value = '';
    fetch('http://localhost:5000/note', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => { setIsReload(!isReload) });
  }


  return (
    <div className='bg-[#6b7280] md:w-1/2 w-full mx-auto mt-10 rounded pb-5'>
      <h1 className="text-3xl font-bold text-center text-white py-3">
        ColorNote
      </h1>

      <form onSubmit={handleSubmit} className='px-6 py-2 flex justify-center'>
        <input type="text" name='name' placeholder='Add Note' className='rounded w-3/4 focus:outline-pink-400 px-2' />
        <button type='submit' className='bg-orange-400 px-4 py-2 rounded text-white font-bold'>Add</button>
      </form>

      {
        notes.map(note => <div key={note._id} className="flex flex-col bg-violet-400 px-6 py-2 my-2 w-3/4 mx-auto">
          <div className='flex justify-between'>
            <p>{note.text}</p>
            <div className='flex md:flex-row flex-col gap-2'>
              <button className='bg-red-400 px-4 py-2 ml-2 rounded text-white font-bold' onClick={() => handleDelete(note._id)}>Delete</button>
              <NoteCard setIsReload={setIsReload} isReload={isReload} id={note._id} />
            </div>
          </div>

        </div>
        )
      }



    </div >
  );
}

export default App;
