import { useRouter } from "next/router"
import {getFilteredEvents} from '../../dummy-data'
import EventList from "@/components/events/event-list"
import ResultsTitle from "@/components/events/results-title"
import Button from "@/components/ui/button"
import ErrorAlert from "@/components/ui/error-alert"

function FilterEventsPage() {

    const router = useRouter()

    const filterData = router.query.slug
    // console.log(filterData);

    if (!filterData) {
        return <p className="center">Loading...</p>
    }

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

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    })

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

    const date = new Date(numYear, numMonth - 1) // -1 cause it starts with 0, not 1 (lesson: 86 Nextjs course)

    return (
        <>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    )
}

export default FilterEventsPage