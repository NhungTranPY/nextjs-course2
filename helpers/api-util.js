export async function getAllEvents() {
    const response = await fetch('https://nextjs-learn1-default-rtdb.firebaseio.com/events.json')
    const data = await response.json()

    const events = [] // firebase returns our data as an object

    for (const key in data) {
        events.push({
            id: key,
            ...data[key] // lesson 121. instead copy one by one title, date... => use this syntax to copy everything
        })
    }

    return events
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents()
    return allEvents.filter((event) => event.isFeatured);
}