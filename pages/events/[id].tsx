import { getAllEventIds, getEventById } from 'lib/events'
import { useRouter } from 'next/dist/client/router'

export const getStaticPaths = async (ctx) => {
  const paths = await getAllEventIds()

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const eventData = await getEventById(params.id)

  return {
    props: {
      eventData
    }
  }
}

const EventDetails = ({ eventData }) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className="center">
      <h1>{eventData.title}</h1>
      <p>{eventData.location}</p>
    </div>
  );
}

export default EventDetails;