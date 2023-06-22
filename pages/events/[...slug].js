import { useRouter } from "next/router"
import {getFilteredEvents} from '../../helpers/api-util'
import EventList from "@/components/events/event-list"
import ResultsTitle from "@/components/events/results-title"
import Button from "@/components/ui/button"
import ErrorAlert from "@/components/ui/error-alert"

function FilterEventsPage(props) {

    const router = useRouter()

    // const filterData = router.query.slug
    // // console.log(filterData);

    // if (!filterData) {
    //     return <p className="center">Loading...</p>
    // }

    // const filteredYear = filterData[0] // will get string year
    // const filteredMonth = filterData[1] // will get string month

    // const numYear = +filteredYear // change string year to number year
    // const numMonth = +filteredMonth // change string month to number month

    if (props.hasError) {
        return (
            <>
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show All Events</Button>
                </div>
                
            </>            
        )
    }

    const filteredEvents = props.events

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show All Events</Button>
                </div>
                
            </>
        )
    }

    const date = new Date(props.date.year, props.date.month - 1) // -1 cause it starts with 0, not 1 (lesson: 86 Nextjs course)

    return (
        <>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    )
}

export async function getServerSideProps(context) {

    const { params } = context

    const filterData = params.slug

    const filteredYear = filterData[0] // will get string year
    const filteredMonth = filterData[1] // will get string month

    const numYear = +filteredYear // change string year to number year
    const numMonth = +filteredMonth // change string month to number month

    if (
        isNaN(numYear) || 
        isNaN(numMonth) || 
        numYear > 2030 || 
        numYear < 2021 || 
        numMonth < 1 || 
        numMonth > 12
    ) {
        return {
            props: { hasError: true }
            // notFound: true,
            // redirect: {
            //     destination: '/error'
            // }
        }
    }

    const filteredEvents =  await getFilteredEvents({
        year: numYear,
        month: numMonth
    })

    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth
            }
        }
    }
}

export default FilterEventsPage