import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [tranSition, setTranSition] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name, value);

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  async function submitNote(event) {
    
    
    try {
      const response = await fetch('http://localhost:3000/send-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note), // Sending the input value as JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response from backend:', data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  

    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  return (
    <div>
      <form
        className="create-note"
        onClick={() => {
          setTranSition(true);
        }}
      >
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />

        {tranSition && (
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows="3"
          />
        )}

        {tranSition && (
          <Zoom in={true}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
