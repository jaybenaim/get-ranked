import { getAllEventIds, getEventById } from 'lib/events'
import { IEvent } from 'lib/types/events'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'

const EventDetails = () => {
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

  return (
    <div className="center">
      <h1>{eventData.title}</h1>
      <p>{eventData.location}</p>
    </div>
  );
}

export default EventDetails;