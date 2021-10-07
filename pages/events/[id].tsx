import { auth } from 'firebase/clientApp'
import { attendEvent, getAllEventIds, getEventById } from 'lib/events'
import { IEvent } from 'lib/types/Event'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Button from '@mui/material/Button'

const EventDetails = () => {
  const [user, userLoading, userError] = useAuthState(auth)
  const [eventData, setEventData] = useState({
    title: "",
    location: ""
  } as IEvent)
  const router = useRouter()
  const { id } = router.query


  const getEvent = async () => {
    const eventData: IEvent = await getEventById(id as string)

    if (eventData) {
      setEventData(eventData)
    }
  }

  useEffect(() => {
    getEvent()
    // eslint-disable-next-line
  }, [id])

  const handleAttendEvent = async () => {
    const response = await attendEvent(user.uid, id as string)

    console.log(response)
  }

  return (
    <div className="center">
      <h1>{eventData.title}</h1>
      <p>{eventData.location}</p>

      <Button onClick={() => handleAttendEvent()}>Attend</Button>
    </div>
  );
}

export default EventDetails;