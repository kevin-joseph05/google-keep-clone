import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios"

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  async function deleteNote(id) {
    // setNotes(prevNotes => {
    //   return prevNotes.filter((noteItem, index) => {
    //     return index !== id;
    //   });
    // });
    try {
      const response = await fetch(`http://localhost:3000/delete-note/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(id), // Sending the input value as JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response from backend:', data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }
  
  
  useEffect(() => {
    async function getNotes () {
      
      const response = await fetch("http://localhost:3000/get-note", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      return data;
    }
      const onPageRefresh = async() => {
        const response = await getNotes();
        setNotes(response)
        
      };
      onPageRefresh();

  }, []);
  
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        console.log(noteItem)
        
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.note}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
