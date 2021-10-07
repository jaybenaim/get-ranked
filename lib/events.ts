import { db, firebase } from "firebase/clientApp"
import { IEvent } from 'lib/types/Event'

const Events = db.collection("Events")

export async function getAllEventIds() {
  const events = await Events.get()
  let params = []

  events.forEach(event => {
    params.push({
      params: {
        id: String(event.id)
      }
    })
  })

  return params
}

export async function getEventById(id: string) {
  const event = Events.doc(id)

  return (await event.get()).data() as IEvent
}

export async function getUserCreatedEvents(uid: string) {
  const events = await Events.where('creator', '==', uid).get()

  return events
}

export async function attendEvent(uid: string, eventId: string) {
  const attendees = await (await Events.doc(eventId).get()).data().attendees

  if (!attendees.includes(uid)) {
    const events = await Events.doc(eventId).set({
      attendees: [...attendees, uid]
    }, {
      merge: true
    })

    return events
  }

  return Events
}

export async function getUserAttendingEvents(uid: string) {
  const events = await Events.where('attendees', 'array-contains-any', [uid]).get()

  return events
}
