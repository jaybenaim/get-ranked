import { db } from "firebase/clientApp"

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

  return (await event.get()).data()
}