import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, firestore } from 'firebase/clientApp';
import { IEvent } from "lib/types/events";

const CreateEvent = () => {
  const [user, loading, error] = useAuthState(auth);
  const [event, setEvent] = useState({} as IEvent)

  const createNewEvent = async (e: FormEvent) => {
    e.preventDefault()

    await db.collection('Events').doc(user.uid).set({
      ...event
    })
  }

  return (
    <div>
      <div className="new-event-form">
            <h3>Add New Event</h3>
            <form onSubmit={(e) => createNewEvent(e)}>
              <TextField
                className="title"
                id="title"
                label="Title"
                onChange={(e) => setEvent({
                  ...event,
                  title: e.target.value
                })}
              />

              <TextField
                className="location"
                id="location"
                label="Location"
                onChange={(e) => setEvent({
                  ...event,
                  location: e.target.value
                })}
              />

              <Button variant="contained" type="submit">Submit</Button>
            </form>
          </div>

    </div>
  );
}

export default CreateEvent;