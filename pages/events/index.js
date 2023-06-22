import { useRouter } from "next/router"
import { getAllEvents } from "../../helpers/api-util"
import EventList from '../../components/events/event-list'
import EventsSearch from "@/components/events/events-search"

function AllEventsPage(props) {
    const router = useRouter()
    // const events = getAllEvents()

    const {events} = props

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath) // to go to different page
    }

    return (
        <>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </>
    )
}

export async function getStaticProps() {
    const events = await getAllEvents()

    return {
        props: {
            events: events
        },
        revalidate: 60
    }
}

export default AllEventsPage