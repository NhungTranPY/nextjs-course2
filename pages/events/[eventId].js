import EventContent from "@/components/event-detail/event-content"
import EventLogistics from "@/components/event-detail/event-logistics"
import EventSummary from "@/components/event-detail/event-summary"
import ErrorAlert from "@/components/ui/error-alert"
import { getEventById, getAllEvents } from "../../helpers/api-util"

function EventDetailPage(props) {

    // const router = useRouter()
    // const eventId = router.query.eventId // eventId nay phai trung voi ten file moi access lay dc id
    // const event = getEventById(eventId)
    const event = props.selectedEvent

    if (!event) {
        return (
            <ErrorAlert>
                <p>No event found!</p>
            </ErrorAlert>
        )      
    }

    return (
        <>
            <EventSummary title={event.title} />
            <EventLogistics 
                date={event.date} 
                address={event.location} 
                image={event.image} 
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </>
    )
}

export async function getStaticProps(context) {
    const {eventId} = context.params.eventId

    const event = await getEventById(eventId)

    return {
        props: {
            selectedEvent: event
        }
    }
}

export async function getStaticPaths() {
    const events = await getAllEvents()

    const paths = events.map(event => ({ params: {eventId: event.id}}))

    return {
        paths: paths,
        fallback: false // to let Nextjs knows if load this file for unknown id then render 404
    }
}

export default EventDetailPage